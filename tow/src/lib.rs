//! An experimental starlark-based task tool for extending Cargo projects.

#![warn(missing_docs)]

use {
    failure::{bail, Error},
    std::{
        path::{Path, PathBuf},
        sync::{Arc, Mutex},
    },
    tracing::*,
};

/// A database containing the build graph.
pub struct Database {}

impl Database {
    /// todo
    pub fn realize(&mut self, _outcomes: &[String]) -> Result<(), Error> {
        unimplemented!()
    }
}

/// Find `root.towel` in the provided directory or its nearest parent.
pub fn find_root_towl(search_start: impl AsRef<Path>) -> Result<PathBuf, Error> {
    let mut search_dir = search_start.as_ref().join("to_pop");
    while search_dir.pop() {
        let search_path = search_dir.join("root.towel");
        if search_path.is_file() {
            return Ok(search_path);
        }
    }
    Err(failure::err_msg(
        "couldn't find a root.towl in the current directory or parents",
    ))
}

/// Evaluate `root.towel`, returning a [`Database`].
pub fn eval_root(root_towl: impl AsRef<Path>) -> Result<Database, Error> {
    let root_towl = root_towl.as_ref();
    let root_path = root_towl.display();
    info!({ %root_path }, "starting");

    let code_map = Arc::new(Mutex::new(codemap::CodeMap::new()));
    let mut env = starlark::environment::Environment::new("root");
    let result = starlark::eval::simple::eval_file(
        &code_map,
        &root_path.to_string(),
        false,
        &mut env,
    );

    debug!({ ?env }, "execution terminated");
    let returned = match result {
        Err(why) => {
            use codemap_diagnostic::{ColorConfig, Emitter};
            let cm = code_map.lock().unwrap();
            let mut emitter = Emitter::stderr(ColorConfig::Auto, Some(&*cm));
            error!("failed to evaluate {}:", root_path);
            emitter.emit(&[why]);
            bail!("execution failure");
        }
        Ok(r) => r,
    };

    info!({ ?returned }, "evaluated {}", root_towl.display());
    Ok(Database {})
}