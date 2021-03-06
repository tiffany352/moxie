use {
    actix::prelude::*,
    actix_web::{
        dev::{MessageBody, Service, ServiceRequest, ServiceResponse, Transform},
        http::uri::Uri,
        middleware, web, App, HttpServer,
    },
    actix_web_actors::ws,
    crossbeam::channel::{select, unbounded as chan, Receiver, Sender},
    failure::Error,
    futures::{compat::Compat, future::Ready, TryFutureExt},
    futures01::{Async, Future as OldFuture},
    gumdrop::Options,
    notify::Watcher,
    session::{ChangeWatchSession, Changed},
    std::{
        net::IpAddr,
        path::{Path, PathBuf},
        sync::Arc,
        thread::JoinHandle,
    },
    tracing::*,
};

mod session;

#[derive(Debug, Options)]
pub struct ServerOpts {
    #[options(default = "::1")]
    addr: IpAddr,
    #[options(default = "8000")]
    port: u16,
}

impl Default for ServerOpts {
    fn default() -> Self {
        Self {
            // this is so annoying. different cli parsing option maybe?
            addr: "::1".parse().unwrap(),
            port: 8000,
        }
    }
}

impl ServerOpts {
    pub fn run_server(self, root_path: PathBuf) -> Result<(), Error> {
        let (session_tx, session_rx) = chan();
        let watcher = Arc::new(FilesWatcher::new(&root_path, session_rx));

        let root_url = format!("http://[{}]:{}/index.html", &self.addr, &self.port);
        std::thread::spawn(move || {
            opener::open(&root_url).unwrap();
        });

        HttpServer::new(move || {
            let session_tx = session_tx.clone();
            let watcher_middleware = watcher.clone();
            App::new()
                .wrap(middleware::Logger::default())
                .service(web::resource("/ch-ch-ch-changes").route(web::get().to(
                    move |req, stream: web::Payload| {
                        let session_tx = session_tx.clone();
                        let session = ChangeWatchSession::new(session_tx);
                        ws::start(session, &req, stream)
                    },
                )))
                .wrap(watcher_middleware)
                .default_service(actix_files::Files::new("/", &root_path).show_files_listing())
        })
        .bind((self.addr, self.port))
        .unwrap()
        .run()
        .unwrap();
        Ok(())
    }
}

fn pump_channels(
    root: PathBuf,
    (uri_rx, session_rx): (Receiver<Uri>, Receiver<Addr<ChangeWatchSession>>),
) {
    let (event_tx, event_rx) = chan();
    let mut sessions = Vec::new();

    let mut watcher = notify::watcher(event_tx, std::time::Duration::from_millis(500)).unwrap();

    loop {
        select! {
            recv(uri_rx) -> new_uri => {
                let mut new_path = root.clone();
                let new_uri = new_uri.expect("path events should be live");

                for part in new_uri.path().split("/") {
                    new_path.push(part);
                }

                let displayed = new_path.display().to_string();

                if let Err(why) = watcher.watch(&displayed, notify::RecursiveMode::NonRecursive) {
                    warn!("couldn't add a watch for {} because {:?}", &displayed, why);
                } else {
                    debug!("added/refreshed watch for {}", &displayed);
                }
            },
            recv(session_rx) -> new_session => {
                let new_session = new_session.expect("session events should be live");
                sessions.push(new_session);
                debug!("new change watch session");
            },
            recv(event_rx) -> event => {
                if let Ok(event) = event.expect("filesystem events should be live") {
                    'this_event: for path in event.paths {
                        let changed = path.display().to_string();

                        info!("file change detected at {}", &changed);

                        for session in &sessions {
                            session.do_send(Changed(changed.clone()));
                        }
                        break 'this_event;
                    }
                }
            },
        }
    }
}

struct FilesWatcher {
    uri_tx: Sender<Uri>,
    joiner: Option<JoinHandle<()>>,
}

impl FilesWatcher {
    fn new(root_path: &Path, session_rx: Receiver<Addr<ChangeWatchSession>>) -> Self {
        let (uri_tx, uri_rx) = chan();
        let root = root_path.to_owned();
        let joiner = Some(std::thread::spawn(|| {
            pump_channels(root, (uri_rx, session_rx))
        }));

        Self { uri_tx, joiner }
    }
}

impl Drop for FilesWatcher {
    fn drop(&mut self) {
        self.joiner.take().unwrap().join().unwrap();
    }
}

impl<S, B> Transform<S> for FilesWatcher
where
    B: MessageBody,
    S: Service<Request = ServiceRequest, Response = ServiceResponse<B>>,
    S::Future: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = S::Error;
    type Transform = WatchHandle<S>;
    type InitError = ();
    type Future = Compat<Ready<Result<Self::Transform, Self::InitError>>>;

    fn new_transform(&self, service: S) -> Self::Future {
        futures::future::ok(WatchHandle {
            service,
            uri_tx: self.uri_tx.clone(),
        })
        .compat()
    }
}

struct WatchHandle<S> {
    service: S,
    uri_tx: Sender<Uri>,
}

impl<S, B> Service for WatchHandle<S>
where
    B: MessageBody,
    S: Service<Request = ServiceRequest, Response = ServiceResponse<B>>,
    S::Future: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = S::Error;
    type Future = Box<
        dyn OldFuture<
                Item = <<S as Service>::Future as OldFuture>::Item,
                Error = <<S as Service>::Future as OldFuture>::Error,
            > + 'static,
    >;

    fn poll_ready(&mut self) -> Result<Async<()>, Self::Error> {
        Ok(Async::Ready(()))
    }

    fn call(&mut self, req: Self::Request) -> Self::Future {
        let result = self.service.call(req);
        let uri_tx = self.uri_tx.clone();
        let mapped = result.map(move |response| {
            if response.status().is_success() {
                uri_tx
                    .send(response.request().uri().clone())
                    .unwrap_or_else(|_| warn!("wasn't able to send a new uri to watch"));
            }
            response
        });
        Box::new(mapped)
    }
}
