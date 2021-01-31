/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * method creates the HTML element specified by tagName.
 * @param {string} tagName HTML element to create.
 * @return The new HTML Element.
 */
export default function (elementName) {
    return document.createElement(elementName);
}
