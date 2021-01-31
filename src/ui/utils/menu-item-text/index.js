import { createElement, getClassList } from '../../../web-api-polyfills';
/**
 * Creates disabled html button element that serves as menu text entry
 * @param {string} text Text to show.
 */
export default function (text) {
    const element = createElement('button');
    element.innerText = text;
    element.disabled = true;
    getClassList(element).add('ui-menu-item-text');
    return element;
}
