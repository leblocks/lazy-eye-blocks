import { setState } from '../../state';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { createGridButton } from '../components';


import {
    MAIN_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
    BOARD_SIZE_SETTINGS_STATE,
} from '../../state/consts';

/**
 * Creates and configures settings menu.
 */
// TODO refactor with goto
export default function () {
    return createMenu([
        createMenuTitle('Settings'),
        createGridButton(),
        createMenuItem('Speed level', () => setState({ gameState: SPEED_SETTINGS_MENU_STATE })),
        createMenuItem('Left eye color', () => setState({ gameState: LEFT_EYE_COLOR_PICKER_MENU_STATE })),
        createMenuItem('Right eye color', () => setState({ gameState: RIGHT_EYE_COLOR_PICKER_MENU_STATE })),
        createMenuItem('Board size', () => setState({ gameState: BOARD_SIZE_SETTINGS_STATE })),
        createMenuItem('Back', () => setState({ gameState: MAIN_MENU_STATE })),
    ]);
}
