/**
 * Backup for support of cancelAnimationFrame in differnet browsers.
 */
const polyfill = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    // eslint-disable-next-line func-names
    || function (requestID) { clearTimeout(requestID); };

export default polyfill;
