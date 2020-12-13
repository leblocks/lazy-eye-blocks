/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import './icon.ico';
import './main.scss';
import './index.html';

import {
    createSpeedMenu,
    createSettingsMenu,
    initStateViewManager,
    createAboutInfo,
    createLeftEyeColorSettingsInfo,
    createLeftEyeColorPickerMenu,
    createRightEyeColorPickerMenu,
    createRightEyeColorSettingsInfo,
} from './ui';

import { createMenu, createMenuItem, createMenuTitle } from './ui/utils';
import { setState } from './state';

import {
    MAIN_MENU_STATE,
    SETTINGS_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
    ABOUT_INFO_STATE,
    LEFT_EYE_COLOR_SETTINGS_INFO_STATE,
    RIGHT_EYE_COLOR_SETTINGS_INFO_STATE,
} from './state/consts';


window.onload = () => {
    // TODO refactor main menu as separate component
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Main menu'));
    mainMenu.appendChild(createMenuItem('Settings', () => setState({ gameState: SETTINGS_MENU_STATE })));
    mainMenu.appendChild(createMenuItem('About', () => setState({ gameState: ABOUT_INFO_STATE })));

    const map = {
        [MAIN_MENU_STATE]: mainMenu,
        [SETTINGS_MENU_STATE]: createSettingsMenu(),
        [SPEED_SETTINGS_MENU_STATE]: createSpeedMenu(),
        [LEFT_EYE_COLOR_PICKER_MENU_STATE]: createLeftEyeColorPickerMenu(),
        [RIGHT_EYE_COLOR_PICKER_MENU_STATE]: createRightEyeColorPickerMenu(),
        [ABOUT_INFO_STATE]: createAboutInfo(),
        [LEFT_EYE_COLOR_SETTINGS_INFO_STATE]: createLeftEyeColorSettingsInfo(),
        [RIGHT_EYE_COLOR_SETTINGS_INFO_STATE]: createRightEyeColorSettingsInfo(),
    };

    initStateViewManager(MAIN_MENU_STATE, map);
};
