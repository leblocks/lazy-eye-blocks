import { createElement, getClassList } from '../../../web-api-polyfills';

const unfocusButtons = () => {
    // we have to unfocus buttons after each click
    // so those buttons won't be focused when keyboard is touched
    document.querySelectorAll('button')
        .forEach((button) => button.blur());
};

export default function (buttonTitle, onClickHandler) {
    const button = createElement('button');
    getClassList(button).add('action-button');
    button.onclick = () => {
        onClickHandler();
        unfocusButtons();
    };
    button.innerHTML = buttonTitle;
    return button;
}
