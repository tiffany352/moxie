//! Procedural macro support crate for the `topo` crate.

#![deny(missing_docs)]

extern crate proc_macro;
use {
    proc_macro::TokenStream,
    proc_macro_error::{abort, entry_point},
    syn::{
        parse::Parser, punctuated::Punctuated, spanned::Spanned, FnArg, Local, PatType, Stmt, Token,
    },
};

/// Transforms a function declaration into a topologically-nested function which, when called,
/// attaches its call subtopology to that of its caller's (parent's).
#[proc_macro_attribute]
pub fn nested(_attrs: TokenStream, input: TokenStream) -> TokenStream {
    // let mut input_fn: syn::ItemFn = syn::parse_macro_input!(input);

    // TODO insert the Id entrypoint at the top of the function

    // quote::quote!(#input_fn).into()
    input
}

/// Defines required `Env` values for a function. Binds the provided types as if references to
/// them were implicit function arguments.
///
/// TODO this should allow for binding optionally and non-optionally (panicking)
///
/// # Panics
///
/// Will cause the annotated function to panic if it is invoked without the requested type in its
/// `topo::Env`.
///
/// It is **strongly recommended** that functions using this attribute document this contract
/// clearly with examples demonstrating the production of a compatible environment.
#[proc_macro_attribute]
pub fn from_env(args: TokenStream, input: TokenStream) -> TokenStream {
    entry_point(|| {
        let mut input_fn: syn::ItemFn = syn::parse_macro_input!(input);

        let args = Punctuated::<FnArg, Token![,]>::parse_terminated
            .parse(args)
            .unwrap();

        let binding_statements = args
            .into_iter()
            .map(|arg| match arg {
                FnArg::Receiver(_) => abort!("can't receive self by-environment"),
                FnArg::Typed(pt) => pt,
            })
            .map(bind_env_reference)
            .map(Stmt::Local)
            .collect();

        let mut previous_statements =
            std::mem::replace(&mut input_fn.block.stmts, binding_statements);
        input_fn.block.stmts.append(&mut previous_statements);

        quote::quote!(#input_fn).into()
    })
}

/// Create a local Env::expect assignment expression from the `pattern: &type` pair which is passed.
fn bind_env_reference(arg: PatType) -> Local {
    let arg_span = arg.span();

    let ty = match *arg.ty {
        syn::Type::Reference(syn::TypeReference {
            lifetime,
            mutability,
            elem,
            ..
        }) => {
            if mutability.is_some() {
                abort!(
                    mutability.span(),
                    "mutable references cannot be passed by environment"
                );
            }

            if lifetime.is_some() {
                abort!(
                    lifetime.span(),
                    "cannot bind to concrete lifetimes for environment references"
                );
            }

            elem
        }
        ty @ _ => abort!(ty.span(), "only references can be passed by environment"),
    };

    Local {
        attrs: vec![],
        let_token: Token![let](arg_span),
        pat: *arg.pat,
        init: Some((
            Token![=](arg_span),
            Box::new(syn::parse_quote!(&*topo::Env::expect::<#ty>())),
        )),
        semi_token: Token![;](arg_span),
    }
}
