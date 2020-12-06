import { setState } from '../../state';

import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { createGridButton } from '../component';


import { SPEED_SETTINGS_MENU_STATE, MAIN_MENU_STATE } from '../../state/consts';

/**
 * Creates and configures settings menu.
 */
export default function () {
    return createMenu([
        createMenuTitle('Settings'),
        createGridButton(),
        createMenuItem('Speed level', () => setState({ gameState: SPEED_SETTINGS_MENU_STATE })),
        createMenuItem('Back', () => setState({ gameState: MAIN_MENU_STATE })),
    ]);
}
