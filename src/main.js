import './icon.ico';
import './main.scss';
import './index.html';

import {
    createSpeedMenu,
    createSettingsMenu,
    initStateViewManager,
    createLeftEyeColorPickerMenu,
    createRightEyeColorPickerMenu,
} from './ui';

import { createMenu, createMenuItem, createMenuTitle } from './ui/utils';
import { setState } from './state';

import {
    MAIN_MENU_STATE,
    SETTINGS_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
} from './state/consts';

window.onload = () => {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Main menu'));
    mainMenu.appendChild(createMenuItem('Settings', () => setState({ gameState: SETTINGS_MENU_STATE })));

    const map = {
        [MAIN_MENU_STATE]: mainMenu,
        [SETTINGS_MENU_STATE]: createSettingsMenu(),
        [SPEED_SETTINGS_MENU_STATE]: createSpeedMenu(),
        [LEFT_EYE_COLOR_PICKER_MENU_STATE]: createLeftEyeColorPickerMenu(),
        [RIGHT_EYE_COLOR_PICKER_MENU_STATE]: createRightEyeColorPickerMenu(),
    };
    initStateViewManager(MAIN_MENU_STATE, map);
};
