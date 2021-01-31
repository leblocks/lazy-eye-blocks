import { createElement } from '../../../web-api-polyfills';
/**
 * Creates disabled html button element that serves as menu text entry
 * @param {string} text Text to show.
 */
export default function (text) {
    const element = createElement('button');
    element.innerText = text;
    element.disabled = true;
    element.classList.add('ui-menu-item-text');
    return element;
}
