import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { setState, getState, addStateObserver } from '../../state';

import { SETTINGS_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';

// TODO add indicator

const changeSpeedLevel = (delta) => {
    const { speedLevel } = getState();

    if (speedLevel + delta < 0) {
        return;
    }
    setState({ speedLevel: speedLevel + delta });
};

const speedLevelIndicator = () => {
    const id = 'speed-level-indicator';
    const element = document.createElement('div');
    element.setAttribute('id', id);
    element.innerText = 0;

    addStateObserver(({ speedLevel }) => {
        const speedIndicator = document.getElementById(id);
        if (speedIndicator) {
            speedIndicator.innerText = speedLevel;
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
