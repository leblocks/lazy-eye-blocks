import { setState } from '../../state';

import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { createDifficultyLevelControl, createGridButton } from '../component';


import { MAIN_MENU_STATE } from '../../state/consts';

/**
 * Creates and configures settings menu.
 */
export default function () {
    return createMenu([
        createMenuTitle('Settings'),
        createGridButton(),
        createDifficultyLevelControl(),
        createMenuItem('Back', () => setState({ gameState: MAIN_MENU_STATE })),
    ]);
}
