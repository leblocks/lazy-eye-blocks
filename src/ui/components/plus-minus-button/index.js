import { addStateObserver } from '../../../state';

/**
 * Creates control menu entry which has 3 components: plus button, minus button and value indicator.
 * @param {callback} onPlusClick Called on + button click.
 * @param {callback} onMinusClick Called on - button click.
 * @param {callback} onIndicatorUpdate Called every time when state is being updated.
 */
export default function (onPlusClick, onMinusClick, onIndicatorUpdate) {
    const plusButton = document.createElement('button');
    plusButton.innerHTML = '&plus;';
    plusButton.onclick = onPlusClick;

    const minusButton = document.createElement('button');
    minusButton.innerHTML = '&minus;';
    minusButton.onclick = onMinusClick;

    const indicator = document.createElement('div');
    indicator.innerText = 0;

    // bind state updates
    addStateObserver((state) => {
        const valueToSet = onIndicatorUpdate(state);
        if (indicator) {
            indicator.innerText = valueToSet;
        }
    });

    const component = document.createElement('div');
    component.classList.add('plus-minus-button');
    component.appendChild(minusButton);
    component.appendChild(indicator);
    component.appendChild(plusButton);
    return component;
}
