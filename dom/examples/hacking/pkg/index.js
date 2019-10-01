
let wasm;

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
function __wbg_elem_binding0(arg0, arg1, arg2) {
    wasm.__wbg_function_table.get(16)(arg0, arg1, addHeapObject(arg2));
}
function __wbg_elem_binding1(arg0, arg1) {
    wasm.__wbg_function_table.get(34)(arg0, arg1);
}
/**
*/
export function main() {
    wasm.main();
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function getObject(idx) { return heap[idx]; }

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm(arg) {

    let len = arg.length;
    let ptr = wasm.__wbindgen_malloc(len);

    const mem = getUint8Memory();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = wasm.__wbindgen_realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*r" The loading of a resource has been aborted. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/abort
*/
export class Abort {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_abort_free(ptr);
    }
}
/**
*r" Progression has been terminated (not due to an error). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/abort_(ProgressEvent)
*/
export class AbortProgress {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_abortprogress_free(ptr);
    }
}
/**
*r" A transaction has been aborted. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/abort_indexedDB
*/
export class AbortTransaction {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_aborttransaction_free(ptr);
    }
}
/**
*r" The associated document has started printing or the print preview has been closed.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/afterprint
*/
export class AfterPrint {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_afterprint_free(ptr);
    }
}
/**
*r" A [CSS animation] has aborted. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/animationcancel
*r" [CSS animation]: https://developer.mozilla.org/en-US/docs/CSS/CSS_animations
*/
export class AnimationCancel {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_animationcancel_free(ptr);
    }
}
/**
*r" A [CSS animation] has completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/animationend
*r" [CSS animation]: https://developer.mozilla.org/en-US/docs/CSS/CSS_animations
*/
export class AnimationEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_animationend_free(ptr);
    }
}
/**
*r" A [CSS animation] is ticked. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/animationiteration
*r" [CSS animation]: https://developer.mozilla.org/en-US/docs/CSS/CSS_animations
*/
export class AnimationIteration {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_animationiteration_free(ptr);
    }
}
/**
*r" A [SMIL] animation element is repeated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/repeatEvent
*r" [SMIL]: https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL
*/
export class AnimationRepeat {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_animationrepeat_free(ptr);
    }
}
/**
*r" A [CSS animation] has started. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/animationstart
*r" [CSS animation]: https://developer.mozilla.org/en-US/docs/CSS/CSS_animations
*/
export class AnimationStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_animationstart_free(ptr);
    }
}
/**
*r" A web application is successfully installed as a progressive web app.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/appinstalled
*/
export class AppInstalled {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_appinstalled_free(ptr);
    }
}
/**
*r" The rendering of an [OfflineAudioContext] is terminated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/complete
*r" [OfflineAudioContext]: https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext
*/
export class AudioComplete {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audiocomplete_free(ptr);
    }
}
/**
*r" The user agent has finished capturing audio for speech recognition. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/audioend
*/
export class AudioEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audioend_free(ptr);
    }
}
/**
*r" Playback has stopped because the end of the media was reached. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/ended_(Web_Audio)
*/
export class AudioEnded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audioended_free(ptr);
    }
}
/**
*r" The input buffer of a [ScriptProcessorNode] is ready to be processed.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/audioprocess
*r" [ScriptProcessorNode]: https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode
*/
export class AudioProcess {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audioprocess_free(ptr);
    }
}
/**
*r" The user agent has started to capture audio for speech recognition. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/audiostart
*/
export class AudioStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_audiostart_free(ptr);
    }
}
/**
*r" The associated document is about to be printed or previewed for printing.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/beforeprint
*/
export class BeforePrint {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_beforeprint_free(ptr);
    }
}
/**
*r" The window, the document and its resources are about to be unloaded.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
*/
export class BeforeUnload {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_beforeunload_free(ptr);
    }
}
/**
*r" An element has lost focus (does not bubble). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/blur
*/
export class Blur {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_blur_free(ptr);
    }
}
/**
*r" The user agent can play the media, but estimates that not enough data has been loaded to
*r" play the media up to its end without having to stop for further buffering of content.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/canplay
*/
export class CanPlay {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_canplay_free(ptr);
    }
}
/**
*r" The user agent can play the media up to its end without having to stop for further buffering
*r" of content. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/canplaythrough
*/
export class CanPlayThrough {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_canplaythrough_free(ptr);
    }
}
/**
*r" The change event is fired for [`<textarea>`][textarea] elements when a change to the
*r" element's value is committed by the user. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/change
*r" [textarea]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
*/
export class Change {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_change_free(ptr);
    }
}
/**
*r" The battery begins or stops charging. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/chargingchange
*/
export class ChargingChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_chargingchange_free(ptr);
    }
}
/**
*r" The chargingTime attribute has been updated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/chargingtimechange
*/
export class ChargingTime {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_chargingtime_free(ptr);
    }
}
/**
*r" A message is received from a child (i)frame or a parent window. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/message_webmessaging
*/
export class ChildMessage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_childmessage_free(ptr);
    }
}
/**
*r" A pointing device button has been pressed and released on an element.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/click
*/
export class Click {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_click_free(ptr);
    }
}
/**
*r" A WebSocket connection has been closed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/close_websocket
*/
export class CloseWebsocket {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_closewebsocket_free(ptr);
    }
}
/**
*r" The composition of a passage of text has been completed or canceled.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/compositionend
*/
export class CompositionEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_compositionend_free(ptr);
    }
}
/**
*r" The composition of a passage of text is prepared (similar to keydown for a keyboard input,
*r" but works with other inputs such as speech recognition). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/compositionstart
*/
export class CompositionStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_compositionstart_free(ptr);
    }
}
/**
*r" A character is added to a passage of text being composed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/compositionupdate
*/
export class CompositionUpdate {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_compositionupdate_free(ptr);
    }
}
/**
*r" An open connection to a database is blocking a versionchange transaction on the same
*r" database. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/blocked_indexedDB
*/
export class ConnectionBlocked {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_connectionblocked_free(ptr);
    }
}
/**
*r" The right button of the mouse is clicked (before the context menu is displayed).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/contextmenu
*/
export class ContextMenu {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_contextmenu_free(ptr);
    }
}
/**
*r" A contextmenu event was fired on/bubbled to an element that has a [contextmenu] attribute.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/show
*r" [contextmenu]: https://developer.mozilla.org/en-US/docs/DOM/element.contextmenu
*/
export class ContextMenuShow {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_contextmenushow_free(ptr);
    }
}
/**
*r" The text selection has been added to the clipboard. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/copy
*/
export class Cp {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_cp_free(ptr);
    }
}
/**
*r" The text selection has been removed from the document and added to the clipboard.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/cut
*/
export class Cut {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_cut_free(ptr);
    }
}
/**
*r" The first frame of the media has finished loading. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/loadeddata
*/
export class DataLoaded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dataloaded_free(ptr);
    }
}
/**
*r" A media device such as a camera, microphone, or speaker is connected or removed from the
*r" system. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/devicechange
*/
export class DeviceChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_devicechange_free(ptr);
    }
}
/**
*r" Fresh data is available from a motion sensor. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
*/
export class DeviceMotion {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_devicemotion_free(ptr);
    }
}
/**
*r" Fresh data is available from an orientation sensor. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/deviceorientation
*/
export class DeviceOrientation {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_deviceorientation_free(ptr);
    }
}
/**
*r" The dischargingTime attribute has been updated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dischargingtimechange
*/
export class DischargingTime {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dischargingtime_free(ptr);
    }
}
/**
*r" The document has finished loading (but not its dependent resources).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
*/
export class DomContentLoaded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_domcontentloaded_free(ptr);
    }
}
/**
*r" A pointing device button is clicked twice on an element. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dblclick
*/
export class DoubleClick {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_doubleclick_free(ptr);
    }
}
/**
*r" An element or text selection is being dragged (every 350ms). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/drag
*/
export class Drag {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_drag_free(ptr);
    }
}
/**
*r" A drag operation is being ended (by releasing a mouse button or hitting the escape key).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dragend
*/
export class DragEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dragend_free(ptr);
    }
}
/**
*r" A dragged element or text selection enters a valid drop target. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dragenter
*/
export class DragEnter {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dragenter_free(ptr);
    }
}
/**
*r" A dragged element or text selection leaves a valid drop target. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dragleave
*/
export class DragLeave {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dragleave_free(ptr);
    }
}
/**
*r" An element or text selection is being dragged over a valid drop target (every 350ms).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dragover
*/
export class DragOver {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dragover_free(ptr);
    }
}
/**
*r" The user starts dragging an element or text selection. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/dragstart
*/
export class DragStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dragstart_free(ptr);
    }
}
/**
*r" An element is dropped on a valid drop target. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/drop
*/
export class Dropped {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_dropped_free(ptr);
    }
}
/**
*r" The duration attribute has been updated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/durationchange
*/
export class DurationChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_durationchange_free(ptr);
    }
}
/**
*r" The media has become empty; for example, this event is sent if the media has already been
*r" loaded (or partially loaded), and the load() method is called to reload it.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/emptied
*/
export class Emptied {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_emptied_free(ptr);
    }
}
/**
*r" An event source connection has been failed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error
*/
export class EventSourceError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_eventsourceerror_free(ptr);
    }
}
/**
*r" A message is received through an event source. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/message_serversentevents
*/
export class EventSourceMessage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_eventsourcemessage_free(ptr);
    }
}
/**
*r" An event source connection has been established. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/open_serversentevents
*/
export class EventSourceOpen {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_eventsourceopen_free(ptr);
    }
}
/**
*r" An element has received focus (does not bubble). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/focus
*/
export class Focus {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_focus_free(ptr);
    }
}
/**
*r" An element is about to receive focus (bubbles). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/focusin
*/
export class FocusIn {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_focusin_free(ptr);
    }
}
/**
*r" An element is about to lose focus (bubbles). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/focusout
*/
export class FocusOut {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_focusout_free(ptr);
    }
}
/**
*r" A form is reset. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/reset
*/
export class FormReset {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_formreset_free(ptr);
    }
}
/**
*r" An element was turned to fullscreen mode or back to normal mode. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/fullscreenchange
*/
export class FullscreenChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_fullscreenchange_free(ptr);
    }
}
/**
*r" It was impossible to switch to fullscreen mode for technical reasons or because the
*r" permission was denied. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/fullscreenerror
*/
export class FullscreenError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_fullscreenerror_free(ptr);
    }
}
/**
*r" A gamepad has been connected. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/gamepadconnected
*/
export class GamepadConnected {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_gamepadconnected_free(ptr);
    }
}
/**
*r" A gamepad has been disconnected. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/gamepaddisconnected
*/
export class GamepadDisconnected {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_gamepaddisconnected_free(ptr);
    }
}
/**
*r" Element receives pointer capture. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/gotpointercapture
*/
export class GotPointerCapture {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_gotpointercapture_free(ptr);
    }
}
/**
*r" The fragment identifier of the URL has changed (the part of the URL after the #).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/hashchange
*/
export class HashChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_hashchange_free(ptr);
    }
}
/**
*r" The value of an element changes or the content of an element with the attribute
*r" [contenteditable] is modified.
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/input
*r" [contenteditable]: https://developer.mozilla.org/en-US/docs/DOM/Element.contentEditable
*/
export class Input {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_input_free(ptr);
    }
}
/**
*r" A submittable element has been checked and doesn't satisfy its constraints.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/invalid
*/
export class Invalid {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_invalid_free(ptr);
    }
}
/**
*r" A key is pressed down. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/keydown
*/
export class KeyDown {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_keydown_free(ptr);
    }
}
/**
*r" A key is released. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/keyup
*/
export class KeyUp {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_keyup_free(ptr);
    }
}
/**
*r" The user's preferred languages have changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/languagechange
*/
export class LanguageChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_languagechange_free(ptr);
    }
}
/**
*r" The level attribute has been updated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/levelchange
*/
export class LevelChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_levelchange_free(ptr);
    }
}
/**
*r#" Progress has stopped (after "error", "abort" or "load" have been dispatched)."#
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/loadend
*/
export class LoadEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_loadend_free(ptr);
    }
}
/**
*r" Progress has begun. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/loadstart
*/
export class LoadStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_loadstart_free(ptr);
    }
}
/**
*r" Element lost pointer capture. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/lostpointercapture
*/
export class LostPointerCapture {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_lostpointercapture_free(ptr);
    }
}
/**
*r" A message error is raised when a message is received by an object. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/messageerror
*/
export class MessageError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_messageerror_free(ptr);
    }
}
/**
*r" The metadata has been loaded. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/loadedmetadata
*/
export class MetadataLoaded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_metadataloaded_free(ptr);
    }
}
/**
*r" A pointing device button (usually a mouse) is pressed on an element.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mousedown
*/
export class MouseDown {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mousedown_free(ptr);
    }
}
/**
*r" A pointing device is moved onto the element that has the listener attached.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter
*/
export class MouseEnter {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mouseenter_free(ptr);
    }
}
/**
*r" A pointing device is moved off the element that has the listener attached.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseleave
*/
export class MouseLeave {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mouseleave_free(ptr);
    }
}
/**
*r" A pointing device is moved over an element. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mousemove
*/
export class MouseMove {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mousemove_free(ptr);
    }
}
/**
*r" A pointing device is moved off the element that has the listener attached or off one of its
*r" children. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseout
*/
export class MouseOut {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mouseout_free(ptr);
    }
}
/**
*r" A pointing device is moved onto the element that has the listener attached or onto one of
*r" its children. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseover
*/
export class MouseOver {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mouseover_free(ptr);
    }
}
/**
*r" A pointing device button is released over an element. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseup
*/
export class MouseUp {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_mouseup_free(ptr);
    }
}
/**
*r" A system notification spawned by [ServiceWorkerRegistration.showNotification()][notif] has
*r" been clicked. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
*r" [notif]: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
*/
export class NotificationClick {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_notificationclick_free(ptr);
    }
}
/**
*r" The browser has lost access to the network. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/offline
*/
export class Offline {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_offline_free(ptr);
    }
}
/**
*r" The browser has gained access to the network (but particular websites might be unreachable).
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/online
*/
export class Online {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_online_free(ptr);
    }
}
/**
*r" The orientation of the device (portrait/landscape) has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
*/
export class OrientationChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_orientationchange_free(ptr);
    }
}
/**
*r" A session history entry is being traversed from. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pagehide
*/
export class PageHide {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pagehide_free(ptr);
    }
}
/**
*r" A session history entry is being traversed to. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pageshow
*/
export class PageShow {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pageshow_free(ptr);
    }
}
/**
*r" Data has been transferred from the system clipboard to the document.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/paste
*/
export class Paste {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_paste_free(ptr);
    }
}
/**
*r" Playback has been paused. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pause
*/
export class Pause {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pause_free(ptr);
    }
}
/**
*r" Playback has begun. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/play
*/
export class Play {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_play_free(ptr);
    }
}
/**
*r" Playback has stopped because the end of the media was reached. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/ended
*/
export class PlaybackEnded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_playbackended_free(ptr);
    }
}
/**
*r" The playback rate has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/ratechange
*/
export class PlaybackRateChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_playbackratechange_free(ptr);
    }
}
/**
*r" Playback is ready to start after having been paused or delayed due to lack of data.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/playing
*/
export class Playing {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_playing_free(ptr);
    }
}
/**
*r" The pointer is unlikely to produce any more events. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointercancel
*/
export class PointerCancel {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointercancel_free(ptr);
    }
}
/**
*r" The pointer enters the active buttons state. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerdown
*/
export class PointerDown {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerdown_free(ptr);
    }
}
/**
*r" Pointing device is moved inside the hit-testing boundary. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerenter
*/
export class PointerEnter {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerenter_free(ptr);
    }
}
/**
*r" Pointing device is moved out of the hit-testing boundary. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerleave
*/
export class PointerLeave {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerleave_free(ptr);
    }
}
/**
*r" The pointer was locked or released. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerlockchange
*/
export class PointerLockChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerlockchange_free(ptr);
    }
}
/**
*r" It was impossible to lock the pointer for technical reasons or because the permission was
*r" denied. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerlockerror
*/
export class PointerLockError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerlockerror_free(ptr);
    }
}
/**
*r" The pointer changed coordinates. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointermove
*/
export class PointerMove {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointermove_free(ptr);
    }
}
/**
*r" The pointing device moved out of hit-testing boundary or leaves detectable hover range.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerout
*/
export class PointerOut {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerout_free(ptr);
    }
}
/**
*r" The pointing device is moved into the hit-testing boundary. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerover
*/
export class PointerOver {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerover_free(ptr);
    }
}
/**
*r" The pointer leaves the active buttons state. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pointerup
*/
export class PointerUp {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pointerup_free(ptr);
    }
}
/**
*r" A session history entry is being navigated to (in certain cases). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/popstate
*/
export class PopState {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_popstate_free(ptr);
    }
}
/**
*r" In progress. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/progress
*/
export class Progress {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_progress_free(ptr);
    }
}
/**
*r" Progression has failed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error
*/
export class ProgressError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_progresserror_free(ptr);
    }
}
/**
*r" Progression has been successful. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/load_(ProgressEvent)
*/
export class ProgressLoad {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_progressload_free(ptr);
    }
}
/**
*r" A [Service Worker] has received a push message. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/push
*r" [Service Worker]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
*/
export class Push {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_push_free(ptr);
    }
}
/**
*r" A [PushSubscription] has expired. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pushsubscriptionchange
*r" [PushSubscription]: https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription
*/
export class PushSubscriptionChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_pushsubscriptionchange_free(ptr);
    }
}
/**
*r" The readyState attribute of a document has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/readystatechange
*/
export class ReadyStateChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_readystatechange_free(ptr);
    }
}
/**
*r" A request caused an error and failed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error
*/
export class RequestError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_requesterror_free(ptr);
    }
}
/**
*r" A resource failed to load. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error
*/
export class ResourceError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_resourceerror_free(ptr);
    }
}
/**
*r" A resource and its dependent resources have finished loading. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/load
*/
export class ResourceLoad {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_resourceload_free(ptr);
    }
}
/**
*r" The document view or an element has been scrolled. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
*/
export class Scroll {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_scroll_free(ptr);
    }
}
/**
*r" A <em>seek</em> operation completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/seeked
*/
export class Seeked {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_seeked_free(ptr);
    }
}
/**
*r" A <em>seek</em> operation began. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/seeking
*/
export class Seeking {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_seeking_free(ptr);
    }
}
/**
*r" Some text is being selected. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/select
*/
export class Select {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_select_free(ptr);
    }
}
/**
*r" The selection in the document has been changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/selectionchange
*/
export class SelectionChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_selectionchange_free(ptr);
    }
}
/**
*r" A selection just started. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/selectstart
*/
export class SelectionStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_selectionstart_free(ptr);
    }
}
/**
*r" A message is received from a service worker, or a message is received in a service worker
*r" from another context. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/message_(ServiceWorker)
*/
export class ServiceWorkerMessage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_serviceworkermessage_free(ptr);
    }
}
/**
*r" The node contents of a [`<slot>`][slot] have changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/slotchange
*r" [slot]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement
*/
export class SlotChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_slotchange_free(ptr);
    }
}
/**
*r" Any sound — recognisable speech or not — has stopped being detected.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/soundend
*/
export class SoundEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_soundend_free(ptr);
    }
}
/**
*r" Any sound — recognisable speech or not — has been detected. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/soundstart
*/
export class SoundStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_soundstart_free(ptr);
    }
}
/**
*r" The spoken utterance reaches a word or sentence boundary. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/boundary
*/
export class SpeechBoundary {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechboundary_free(ptr);
    }
}
/**
*r" Speech recognised by the speech recognition service has stopped being detected.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/speechend
*/
export class SpeechEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechend_free(ptr);
    }
}
/**
*r" An error occurs that prevents the utterance from being successfully spoken.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error_(SpeechSynthesisError)
*/
export class SpeechError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speecherror_free(ptr);
    }
}
/**
*r#" The spoken utterance reaches a named SSML "mark" tag. [MDN documentation][mdn]"#
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/mark
*/
export class SpeechMark {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechmark_free(ptr);
    }
}
/**
*r" The utterance is paused part way through. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/pause_(SpeechSynthesis)
*/
export class SpeechPause {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechpause_free(ptr);
    }
}
/**
*r" The speech recognition service has disconnected. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/end_(SpeechRecognition)
*/
export class SpeechRecognitionEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognitionend_free(ptr);
    }
}
/**
*r" A speech recognition error occurs. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error_(SpeechRecognitionError)
*/
export class SpeechRecognitionError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognitionerror_free(ptr);
    }
}
/**
*r" The speech recognition service returns a final result with no significant recognition.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/nomatch
*/
export class SpeechRecognitionNoMatch {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognitionnomatch_free(ptr);
    }
}
/**
*r" The speech recognition service returns a result — a word or phrase has been positively
*r" recognized and this has been communicated back to the app. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/result
*/
export class SpeechRecognitionResult {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognitionresult_free(ptr);
    }
}
/**
*r" The speech recognition service has begun listening to incoming audio with intent to
*r" recognize grammars associated with the current SpeechRecognition. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/start_(SpeechRecognition)
*/
export class SpeechRecognitionStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognitionstart_free(ptr);
    }
}
/**
*r" Sound that is recognised by the speech recognition service as speech has been detected.
*r" [MDN documentation][mdn]
*r
*r#" <a href="https://developer.mozilla.org/en-US/docs/Web/Events/speechstart"#
*/
export class SpeechRecognized {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechrecognized_free(ptr);
    }
}
/**
*r" A paused utterance is resumed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/resume
*/
export class SpeechResume {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechresume_free(ptr);
    }
}
/**
*r" The utterance has begun to be spoken. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/start_(SpeechSynthesis)
*/
export class SpeechStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechstart_free(ptr);
    }
}
/**
*r" The utterance has finished being spoken. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/end_(SpeechSynthesis)
*/
export class SpeechSynthesisEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_speechsynthesisend_free(ptr);
    }
}
/**
*r" The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/stalled
*/
export class Stalled {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_stalled_free(ptr);
    }
}
/**
*r" A storage area ([localStorage] or [sessionStorage]) has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/storage
*r" [localStorage]: https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage
*r" [sessionStorage]: https://developer.mozilla.org/en-US/docs/DOM/Storage#sessionStorage
*/
export class Storage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_storage_free(ptr);
    }
}
/**
*r" A form is submitted. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/submit
*/
export class Submit {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_submit_free(ptr);
    }
}
/**
*r" A request successfully completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/success_indexedDB
*/
export class Success {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_success_free(ptr);
    }
}
/**
*r" Media data loading has been suspended. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/suspend
*/
export class Suspend {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_suspend_free(ptr);
    }
}
/**
*r" Page loading has been stopped before the [SVG] was loaded. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGAbort
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgAbort {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgabort_free(ptr);
    }
}
/**
*r" A [SMIL] animation element begins. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/beginEvent
*r" [SMIL]: https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL
*/
export class SvgAnimationBegin {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svganimationbegin_free(ptr);
    }
}
/**
*r" A [SMIL] animation element ends. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/endEvent
*r" [SMIL]: https://developer.mozilla.org/en-US/docs/SVG/SVG_animation_with_SMIL
*/
export class SvgAnimationEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svganimationend_free(ptr);
    }
}
/**
*r" An error has occurred before the [SVG] was loaded. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGError
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgerror_free(ptr);
    }
}
/**
*r" An [SVG] document has been loaded and parsed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGLoad
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgLoad {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgload_free(ptr);
    }
}
/**
*r" An [SVG] document is being resized. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGResize
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgResize {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgresize_free(ptr);
    }
}
/**
*r" An [SVG] document is being scrolled. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGScroll
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgScroll {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgscroll_free(ptr);
    }
}
/**
*r" An [SVG] document has been removed from a window or frame. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGUnload
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgUnload {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgunload_free(ptr);
    }
}
/**
*r" An [SVG] document is being zoomed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/SVGZoom
*r" [SVG]: https://developer.mozilla.org/en-US/docs/SVG
*/
export class SvgZoom {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_svgzoom_free(ptr);
    }
}
/**
*r" The time indicated by the currentTime attribute has been updated. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate
*/
export class TimeUpdate {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_timeupdate_free(ptr);
    }
}
/**
*r" The timeout event is fired when progression is terminated due to preset time expiring.
*r" [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/timeout
*/
export class Timeout {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_timeout_free(ptr);
    }
}
/**
*r" The browser's resource timing buffer is full. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/resourcetimingbufferfull
*/
export class TimingBufferFull {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_timingbufferfull_free(ptr);
    }
}
/**
*r" A touch point has been disrupted in an implementation-specific manners (too many touch
*r" points for example). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/touchcancel
*/
export class TouchCancel {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_touchcancel_free(ptr);
    }
}
/**
*r" A touch point is removed from the touch surface. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/touchend
*/
export class TouchEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_touchend_free(ptr);
    }
}
/**
*r" A touch point is moved along the touch surface. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/touchmove
*/
export class TouchMove {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_touchmove_free(ptr);
    }
}
/**
*r" A touch point is placed on the touch surface. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/touchstart
*/
export class TouchStart {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_touchstart_free(ptr);
    }
}
/**
*r" A transaction successfully completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/complete_indexedDB
*/
export class TransactionComplete {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transactioncomplete_free(ptr);
    }
}
/**
*r" A versionchange transaction completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/versionchange_indexedDB
*/
export class TransactionVersionChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transactionversionchange_free(ptr);
    }
}
/**
*r" A [CSS transition] has completed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/transitionend
*r" [CSS transition]: https://developer.mozilla.org/en-US/docs/CSS/CSS_transitions
*/
export class TransitionEnd {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transitionend_free(ptr);
    }
}
/**
*r" The document or a dependent resource is being unloaded. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/unload
*/
export class Unload {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_unload_free(ptr);
    }
}
/**
*r" An attempt was made to open a database with a version number higher than its current
*r" version. A versionchange transaction has been created. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/upgradeneeded_indexedDB
*/
export class UpgradeNeeded {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_upgradeneeded_free(ptr);
    }
}
/**
*r" Fresh data is available from a proximity sensor (indicates whether the nearby object is near
*r" the device or not). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/userproximity
*/
export class UserProximity {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_userproximity_free(ptr);
    }
}
/**
*r" The document view has been resized. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/resize
*/
export class ViewResize {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_viewresize_free(ptr);
    }
}
/**
*r" The content of a tab has become visible or has been hidden. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange
*/
export class VisibilityChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_visibilitychange_free(ptr);
    }
}
/**
*r" Fires when the list of SpeechSynthesisVoice objects that would be returned by the
*r" SpeechSynthesis.getVoices() method has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/voiceschanged
*/
export class VoicesChanged {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_voiceschanged_free(ptr);
    }
}
/**
*r" The volume has changed. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/volumechange
*/
export class VolumeChange {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_volumechange_free(ptr);
    }
}
/**
*r" Playback has stopped because of a temporary lack of data. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/waiting
*/
export class Waiting {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_waiting_free(ptr);
    }
}
/**
*r" A WebSocket connection has been closed with prejudice (some data couldn't be sent for
*r" example). [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/error
*/
export class WebsocketError {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_websocketerror_free(ptr);
    }
}
/**
*r" A message is received through a WebSocket. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/message_websocket
*/
export class WebsocketMessage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_websocketmessage_free(ptr);
    }
}
/**
*r" A WebSocket connection has been established. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/open_websocket
*/
export class WebsocketOpen {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_websocketopen_free(ptr);
    }
}
/**
*r" A wheel button of a pointing device is rotated in any direction. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Events/wheel
*/
export class Wheel {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_wheel_free(ptr);
    }
}
/**
*r" A message is received from a Web Worker. [MDN documentation][mdn]
*r
*r" [mdn]: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/message_webworker
*/
export class WorkerMessage {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_workermessage_free(ptr);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__widl_f_remove_event_listener_with_callback_EventTarget = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).removeEventListener(getStringFromWasm(arg1, arg2), getObject(arg3));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__widl_f_create_text_node_Document = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).createTextNode(getStringFromWasm(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__widl_f_create_element_Document = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).createElement(getStringFromWasm(arg1, arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__widl_f_remove_attribute_Element = function(arg0, arg1, arg2) {
        try {
            getObject(arg0).removeAttribute(getStringFromWasm(arg1, arg2));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_first_child_Node = function(arg0) {
        const ret = getObject(arg0).firstChild;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_f_next_sibling_Node = function(arg0) {
        const ret = getObject(arg0).nextSibling;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_f_remove_child_Node = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).removeChild(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_set_attribute_Element = function(arg0, arg1, arg2, arg3, arg4) {
        try {
            getObject(arg0).setAttribute(getStringFromWasm(arg1, arg2), getStringFromWasm(arg3, arg4));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_add_event_listener_with_callback_EventTarget = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).addEventListener(getStringFromWasm(arg1, arg2), getObject(arg3));
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_body_Document = function(arg0) {
        const ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_instanceof_MouseEvent = function(arg0) {
        const ret = getObject(arg0) instanceof MouseEvent;
        return ret;
    };
    imports.wbg.__widl_f_request_animation_frame_Window = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
            return ret;
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_cancel_animation_frame_Window = function(arg0, arg1) {
        try {
            getObject(arg0).cancelAnimationFrame(arg1);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_document_Window = function(arg0) {
        const ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_f_append_child_Node = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).appendChild(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_f_is_same_node_Node = function(arg0, arg1) {
        const ret = getObject(arg0).isSameNode(getObject(arg1));
        return ret;
    };
    imports.wbg.__widl_f_replace_child_Node = function(arg0, arg1, arg2) {
        try {
            const ret = getObject(arg0).replaceChild(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ret0 = passStringToWasm(ret);
        const ret1 = WASM_VECTOR_LEN;
        getInt32Memory()[arg0 / 4 + 0] = ret0;
        getInt32Memory()[arg0 / 4 + 1] = ret1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };
    imports.wbg.__wbg_globalThis_b8da724777cacbb6 = function() {
        try {
            const ret = globalThis.globalThis;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_self_78670bf6333531d2 = function() {
        try {
            const ret = self.self;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_window_b19864ecbde8d123 = function() {
        try {
            const ret = window.window;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbg_global_c6db5ff079ba98ed = function() {
        try {
            const ret = global.global;
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_8effd2c0e33a9e83 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_11f5c018dea16986 = function(arg0, arg1) {
        try {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        const ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__widl_f_debug_1_ = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__widl_f_error_1_ = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__widl_f_info_1_ = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__widl_f_log_1_ = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__widl_f_warn_1_ = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbindgen_closure_wrapper152 = function(arg0, arg1, arg2) {
        const state = { a: arg0, b: arg1, cnt: 1 };
        const real = (arg0) => {
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return __wbg_elem_binding0(a, state.b, arg0);
            } finally {
                if (--state.cnt === 0) wasm.__wbg_function_table.get(17)(a, state.b);
                else state.a = a;
            }
        }
        ;
        real.original = state;
        const ret = real;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper359 = function(arg0, arg1, arg2) {
        const state = { a: arg0, b: arg1, cnt: 1 };
        const real = () => {
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return __wbg_elem_binding1(a, state.b, );
            } finally {
                if (--state.cnt === 0) wasm.__wbg_function_table.get(17)(a, state.b);
                else state.a = a;
            }
        }
        ;
        real.original = state;
        const ret = real;
        return addHeapObject(ret);
    };

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
        wasm.__wbindgen_start();
        return wasm;
    });
}

export default init;

