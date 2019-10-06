use {
    super::Node,
    crate::event::Event,
    std::io::Write,
    wasm_bindgen::{prelude::*, JsCast},
    web_sys as sys,
};

pub struct Callback {
    cb: Closure<dyn FnMut(JsValue)>,
}

impl Callback {
    pub fn new<Ev>(mut cb: impl FnMut(Ev) + 'static) -> Self
    where
        Ev: Event,
    {
        let cb = Closure::wrap(Box::new(move |ev: JsValue| {
            let ev: Ev = ev.dyn_into().unwrap();
            cb(ev);
        }) as Box<dyn FnMut(JsValue)>);
        Self { cb }
    }

    pub fn as_fn(&self) -> &js_sys::Function {
        self.cb.as_ref().unchecked_ref()
    }
}

impl crate::Xml for sys::Node {
    fn write_xml<W: Write>(&self, writer: &mut quick_xml::Writer<W>) {
        use quick_xml::events::{BytesEnd, BytesStart, BytesText, Event};
        if let Some(elem) = self.dyn_ref::<sys::Element>() {
            let name = elem.tag_name().to_lowercase();
            let attrs = elem.attributes();
            let attrs = (0..attrs.length())
                .filter_map(|i| attrs.item(i))
                .map(|a| (a.name(), a.value()))
                .collect::<Vec<_>>();

            writer
                .write_event(Event::Start(
                    BytesStart::borrowed_name(name.as_bytes())
                        .with_attributes(attrs.iter().map(|(n, v)| (n.as_str(), v.as_str()))),
                ))
                .expect("writing start of element");

            let children = sys::Node::child_nodes(elem.as_ref());
            for i in 0..children.length() {
                children.item(i).unwrap().write_xml(writer);
            }

            writer
                .write_event(Event::End(BytesEnd::owned(name.into_bytes())))
                .expect("writing start of element");
        } else if let Some(text) = self.dyn_ref::<sys::Text>() {
            writer
                .write_event(quick_xml::events::Event::Text(BytesText::from_plain_str(
                    &text.data(),
                )))
                .expect("writing text node");
        } else {
            unreachable!("augdom only creates elements and text nodes. this is a bug.");
        }
    }
}

impl From<sys::Node> for Node {
    fn from(e: sys::Node) -> Self {
        Node::Concrete(e)
    }
}

impl From<sys::Element> for Node {
    fn from(e: sys::Element) -> Self {
        Node::Concrete(e.into())
    }
}

impl From<sys::HtmlElement> for Node {
    fn from(e: sys::HtmlElement) -> Self {
        Node::Concrete(e.into())
    }
}

impl From<sys::Text> for Node {
    fn from(e: sys::Text) -> Self {
        Node::Concrete(e.into())
    }
}

impl Node {
    pub(super) fn expect_concrete(&self) -> &sys::Node {
        match self {
            Node::Concrete(n) => n,

            #[cfg(feature = "rsdom")]
            Node::Virtual(_) => panic!("expected a Node::Concrete, found a Node::Virtual"),
        }
    }
}
