import { createElement, getClassList } from '../../../web-api-polyfills';

export default function (value) {
    const button = createElement('div');
    getClassList(button).add('stat-info');
    button.innerHTML = value;
    return button;
}
