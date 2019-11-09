use {
    filter::Visibility,
    header::input_header,
    main_section::main_section,
    moxie_dom::{elements::div, prelude::*},
    std::sync::atomic::{AtomicU32, Ordering},
    wasm_bindgen::prelude::*,
};

#[macro_use]
pub mod filter;
#[macro_use]
pub mod footer;
#[macro_use]
pub mod input; // goes before header for macro imports ugh
#[macro_use]
pub mod header;
#[macro_use]
pub mod item;
#[macro_use]
pub mod main_section;

#[topo::nested]
fn todo_app() {
    let visibility = state(|| Visibility::default());
    let todos = state(|| vec![Todo::new("whoaaa")]);

    topo::call_in_env(
        topo::env! {
            Key<Vec<Todo>> => todos,
            Key<Visibility> => visibility
        },
        || {
            mox! {
                <div class="todoapp">
                    <input_header/>
                    <main_section/>
                </div>
            }
        },
    );
}

#[derive(Clone, Debug)]
pub struct Todo {
    id: u32,
    text: String,
    completed: bool,
}

impl Todo {
    fn new(s: impl Into<String>) -> Self {
        static NEXT_ID: AtomicU32 = AtomicU32::new(0);
        Self {
            id: NEXT_ID.fetch_add(1, Ordering::SeqCst),
            text: s.into(),
            completed: false,
        }
    }
}

#[wasm_bindgen(start)]
pub fn main() {
    console_log::init_with_level(tracing::log::Level::Debug).unwrap();
    std::panic::set_hook(Box::new(|info| {
        tracing::error!("{:#?}", info);
    }));
    moxie_dom::boot(document().body().unwrap(), || todo_app());
}
