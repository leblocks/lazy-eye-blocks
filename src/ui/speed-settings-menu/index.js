import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { setState, getState } from '../../state';

import { SETTINGS_MENU_STATE } from '../../state/consts';

// TODO disable slower button on 0
// TODO add indicator

const changeSpeedLevel = (delta) => {
    const { speedLevel } = getState();

    if (speedLevel + delta < 0) {
        return;
    }
    setState({ speedLevel: speedLevel + delta });
};


export default function () {
    return createMenu([
        createMenuTitle('Speed level'),
        createMenuItem('Make faster', () => changeSpeedLevel(1)),
        createMenuItem('Make slower', () => changeSpeedLevel(-1)),
        createMenuItem('Back', () => setState({ gameState: SETTINGS_MENU_STATE })),
    ]);
}
