/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/Element/classList.
 * @param {HTMLElement} htmlElement Element to extract its class list.
 */
export default function (htmlElement) {
    // TODO setup real polyfill here
    return htmlElement.classList;
}
