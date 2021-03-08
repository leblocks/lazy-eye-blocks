import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { setState, getState, addStateObserver } from '../../state';
import { createElement } from '../../web-api-polyfills';
import { getGameTicksInterval } from '../../blocks/utils';

import { SETTINGS_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';

const changeSpeedLevel = (delta) => {
    const { speedLevel } = getState();

    if (speedLevel + delta < 0) {
        return;
    }

    const newSpeedLevel = speedLevel + delta;
    setState({
        speedLevel: newSpeedLevel,
        gameLogicTicksInterval: getGameTicksInterval(newSpeedLevel),
    });
};

const speedLevelIndicator = () => {
    const element = createElement('div');
    element.innerText = 0;
    element.setAttribute('id', 'speed-level-indicator');
    addStateObserver(['speedLevel'], ({ speedLevel }) => {
        if (element) {
            element.innerText = speedLevel;
        }
    });
    return element;
};

export default function () {
    return createMenu([
        createMenuTitle('Speed level'),
        speedLevelIndicator(),
        createMenuItem('Faster', () => changeSpeedLevel(1)),
        createMenuItem('Slower', () => changeSpeedLevel(-1)),
        createMenuItem('Back', () => goto(SETTINGS_MENU_STATE)),
    ]);
}
