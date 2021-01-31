import { createElement } from '../../../web-api-polyfills';

/**
 * Creates menu-item element on top of button HTML element.
 * @param {string} title Menu item title.
 * @param {callback} onClick Onclick event handler.
 */
export default function (title, onClick) {
    const element = createElement('button');
    element.innerText = title;
    element.onclick = onClick;
    element.classList.add('ui-menu-item');
    return element;
}
