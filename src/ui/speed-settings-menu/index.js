import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { setState, getState, addStateObserver } from '../../state';

import { SETTINGS_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';

const changeSpeedLevel = (delta) => {
    const { speedLevel } = getState();

    if (speedLevel + delta < 0) {
        return;
    }
    setState({ speedLevel: speedLevel + delta });
};

const speedLevelIndicator = () => {
    const element = document.createElement('div');
    element.innerText = 0;
    element.setAttribute('id', 'speed-level-indicator');
    addStateObserver(({ speedLevel }) => {
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
