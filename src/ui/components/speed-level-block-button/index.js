import { getState, setState, addStateObserver } from '../../../state';
import { createMenuItem } from '../../utils';

const getButtonTitle = (increaseSpeedLevel) => `Speed level is ${increaseSpeedLevel ? 'unlocked' : 'locked'}`;

export default function () {
    const { increaseSpeedLevel: currentSpeedLevelIncreaseState } = getState();

    const onClick = () => {
        const { increaseSpeedLevel } = getState();
        setState({ increaseSpeedLevel: !increaseSpeedLevel });
    };

    const button = createMenuItem(getButtonTitle(currentSpeedLevelIncreaseState), onClick);

    // handle state updates
    addStateObserver(['increaseSpeedLevel'], ({ increaseSpeedLevel }) => {
        if (button) {
            button.innerText = getButtonTitle(increaseSpeedLevel);
        }
    });

    return button;
}
