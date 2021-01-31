import { createElement } from '../../../web-api-polyfills';
/**
 * Creates disabled html button element that serves as menu title.
 * @param {string} title Title to show.
 */
export default function (title) {
    const element = createElement('button');
    element.innerText = title;
    element.disabled = true;
    element.classList.add('ui-menu-title');
    return element;
}
