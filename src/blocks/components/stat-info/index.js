import { addStateObserver } from '../../../state';
import { createElement, getClassList } from '../../../web-api-polyfills';

export default function (buttonTitle) {
    const button = createElement('div');

    addStateObserver(['score'], ({ score }) => {
        console.log(score);
    });

    getClassList(button).add('stat-info');
    button.innerHTML = buttonTitle;
    return button;
}
