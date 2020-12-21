/**
 * WebAPIs are not being transpiled by babel.
 * So we have to provide polyfills for older browser versions.
 * Backup for support of cancelAnimationFrame in different browsers.
 */
const polyfill = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || ((requestID) => clearTimeout(requestID));

// TODO wrap export in a function clause
// TODO add description
export default polyfill;
