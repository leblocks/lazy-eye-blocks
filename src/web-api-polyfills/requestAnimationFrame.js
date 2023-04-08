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

/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @param {callback} callbackThe function to call
 * when it's time to update animation for the next repaint
 */
export default function (callback) {
    return polyfill(callback);
}
