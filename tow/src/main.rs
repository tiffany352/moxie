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

fn init_logging(verbose: bool) {
    let level: LevelFilter = if verbose { "debug" } else { "info" }.parse().unwrap();
    let subscriber = Subscriber::builder().with_max_level(level).finish();
    tracing::subscriber::set_global_default(subscriber)
        .expect("couldn't set global default subscriber");
}

fn main() {
    let options = Options::from_args();
    init_logging(options.verbose);
    info!("Hello, world!");
}
