//! An experimental starlark-based task tool for extending Cargo projects.

use {
    failure::Error,
    std::{env::current_dir, path::PathBuf},
    structopt::StructOpt,
    tracing::*,
    tracing_subscriber::{filter::LevelFilter, fmt::Subscriber},
};

#[derive(Debug, StructOpt)]
struct Options {
    /// Enable debug logging.
    #[structopt(short, long)]
    verbose: bool,

    /// Path to root.towl. Defaults to recursively searching from the current directory up.
    #[structopt(long, parse(from_os_str), env = "ROOT_TOWL")]
    root: Option<PathBuf>,

    /// Outcome(s) to realize.
    outcomes: Vec<String>,
}

impl Options {
    fn init_logging(&self) {
        let level: LevelFilter = if self.verbose { "debug" } else { "info" }.parse().unwrap();
        let subscriber = Subscriber::builder().with_max_level(level).finish();
        tracing::subscriber::set_global_default(subscriber)
            .expect("couldn't set global default subscriber");
    }

    fn run(self) -> Result<(), Error> {
        self.init_logging();
        debug!("logging initialized");
        let root_towl = match self.root {
            Some(r) => r,
            None => tow::find_root_towl(current_dir()?)?,
        };

        let mut database = tow::eval_root(root_towl)?;
        database.realize(&self.outcomes)?;

        Ok(())
    }
}

fn main() -> Result<(), Error> {
    Options::from_args().run()
}
