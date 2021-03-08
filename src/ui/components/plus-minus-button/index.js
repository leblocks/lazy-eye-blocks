import { createElement, getClassList } from '../../../web-api-polyfills';
import { addStateObserver } from '../../../state';

/**
 * Creates control menu entry which has 3 components: plus button, minus button and value indicator.
 * @param {callback} onPlusClick Called on + button click.
 * @param {callback} onMinusClick Called on - button click.
 * @param {callback} onIndicatorUpdate Called every time when state is being updated.
 */
export default function (onPlusClick, onMinusClick, onIndicatorUpdate) {
    const plusButton = createElement('button');
    plusButton.innerHTML = '&plus;';
    plusButton.onclick = onPlusClick;

    const minusButton = createElement('button');
    minusButton.innerHTML = '&minus;';
    minusButton.onclick = onMinusClick;

    const indicator = createElement('div');
    indicator.innerText = 0;

    // bind state updates
    // we don't know for sure on which properties it should be updated
    // so will sign it on all updates
    addStateObserver([], (state) => {
        const valueToSet = onIndicatorUpdate(state);
        if (indicator) {
            indicator.innerText = valueToSet;
        }
    });

    const component = createElement('div');
    getClassList(component).add('plus-minus-button');
    component.appendChild(minusButton);
    component.appendChild(indicator);
    component.appendChild(plusButton);
    return component;
}
