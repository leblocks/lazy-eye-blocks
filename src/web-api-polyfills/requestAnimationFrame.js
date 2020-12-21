/**
 * WebAPIs are not being transpiled by babel.
 * So we have to provide polyfills for older browser versions.
 * Backup for support of requestAnimationFrame in different browsers.
 */
const polyfill = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    // simulate calling code 60 times per second
    || ((f) => setTimeout(f, 1000 / 60));

// TODO wrap export in a function clause
// TODO add description
export default polyfill;
