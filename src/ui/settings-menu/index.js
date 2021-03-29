import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { createColoringModeButton, createGridButton } from '../components';


import {
    MAIN_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
    BOARD_SIZE_SETTINGS_STATE,
} from '../../state/consts';
import { goto } from '../../utils';

/**
 * Creates and configures settings menu.
 */
export default function () {
    return createMenu([
        createMenuTitle('Settings'),
        createGridButton(),
        createColoringModeButton(),
        createMenuItem('Speed level', () => goto(SPEED_SETTINGS_MENU_STATE)),
        createMenuItem('Left eye color', () => goto(LEFT_EYE_COLOR_PICKER_MENU_STATE)),
        createMenuItem('Right eye color', () => goto(RIGHT_EYE_COLOR_PICKER_MENU_STATE)),
        createMenuItem('Board size', () => goto(BOARD_SIZE_SETTINGS_STATE)),
        createMenuItem('Back', () => goto(MAIN_MENU_STATE)),
    ]);
}
