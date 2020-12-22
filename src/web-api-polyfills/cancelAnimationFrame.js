/**
 * WebAPIs are not being transpiled by babel.
 * So we have to provide polyfills for older browser versions.
 * Backup for support of cancelAnimationFrame in different browsers.
 */
const polyfill = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || ((requestId) => clearTimeout(requestId));

/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
 * Method cancels an animation frame request previously scheduled through a call
 * to window.requestAnimationFrame().
 * @param {number} requestId Request Id as returned by window requestAnimationFrame.
 */
export default function (requestId) {
    polyfill(requestId);
}
