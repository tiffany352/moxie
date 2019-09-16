//! An experimental starlark-based task tool for extending Cargo projects.

use {
    structopt::StructOpt,
    tracing::*,
    tracing_subscriber::{filter::LevelFilter, fmt::Subscriber},
};

#[derive(Debug, StructOpt)]
struct Options {
    /// Enables debug logging.
    verbose: bool,
}

fn main() {
    let options = Options::from_args();
    let level: LevelFilter = if options.verbose { "debug" } else { "info" }
        .parse()
        .unwrap();
    let subscriber = Subscriber::builder().with_max_level(level).finish();
    tracing::subscriber::set_global_default(subscriber)
        .expect("couldn't set global default subscriber");
    info!("Hello, world!");
}
