/**
 * Backup for support of requestAnimationFrame in differnet browsers.
 */
const polyfill = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    // eslint-disable-next-line func-names
    || function (f) { return setTimeout(f, 1000 / 60); }; // simulate calling code 60

export default polyfill;
