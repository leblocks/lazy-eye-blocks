import { createElement, getClassList } from '../../../web-api-polyfills';

/**
 * Creates new menu.
 * @param {HTMLElement[]} [children] Menu items that will be appended to the component.
 */
export default function (children) {
    const element = createElement('div');
    getClassList(element).add('ui-menu');

    if (children) {
        children.forEach((child) => element.appendChild(child));
    }

    return element;
}
