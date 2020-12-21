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
    createMainMenu,
    createBoardSizeSettingsMenu,
} from './ui';

import {
    MAIN_MENU_STATE,
    SETTINGS_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
    ABOUT_INFO_STATE,
    LEFT_EYE_COLOR_SETTINGS_INFO_STATE,
    RIGHT_EYE_COLOR_SETTINGS_INFO_STATE,
    BOARD_SIZE_SETTINGS_STATE,
    BLOCKS_STATE,
} from './state/consts';

import createBlocksCanvas from './blocks';

window.onload = () => {
    initStateViewManager(MAIN_MENU_STATE, {
        [MAIN_MENU_STATE]: createMainMenu(),
        [SETTINGS_MENU_STATE]: createSettingsMenu(),
        [SPEED_SETTINGS_MENU_STATE]: createSpeedMenu(),
        [LEFT_EYE_COLOR_PICKER_MENU_STATE]: createLeftEyeColorPickerMenu(),
        [RIGHT_EYE_COLOR_PICKER_MENU_STATE]: createRightEyeColorPickerMenu(),
        [ABOUT_INFO_STATE]: createAboutInfo(),
        [LEFT_EYE_COLOR_SETTINGS_INFO_STATE]: createLeftEyeColorSettingsInfo(),
        [RIGHT_EYE_COLOR_SETTINGS_INFO_STATE]: createRightEyeColorSettingsInfo(),
        [BOARD_SIZE_SETTINGS_STATE]: createBoardSizeSettingsMenu(),
        [BLOCKS_STATE]: createBlocksCanvas(),
    });
};
