import { createElement, getClassList } from '../../../web-api-polyfills';

export default function (buttonTitle, onClickHandler) {
    const button = createElement('button');
    getClassList(button).add('action-button');
    button.onclick = onClickHandler;
    button.innerHTML = buttonTitle;
    return button;
}
