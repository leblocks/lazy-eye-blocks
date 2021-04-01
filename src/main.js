import './icon.ico';
import './main.scss';
// import './index.html';

import './handlebars/pages/landing-page/index.hjs';
import './handlebars/pages/exercise-page/exercise.hjs';

import {
    createSpeedMenu,
    createSettingsMenu,
    initStateViewManager,
    createLeftEyeColorPickerMenu,
    createRightEyeColorPickerMenu,
    createMainMenu,
    createBoardSizeSettingsMenu,
    createGameOverMenu,
} from './ui';

import {
    MAIN_MENU_STATE,
    SETTINGS_MENU_STATE,
    SPEED_SETTINGS_MENU_STATE,
    LEFT_EYE_COLOR_PICKER_MENU_STATE,
    RIGHT_EYE_COLOR_PICKER_MENU_STATE,
    BOARD_SIZE_SETTINGS_STATE,
    BLOCKS_STATE,
    GAME_OVER_STATE,
} from './state/consts';

import createBlocksCanvas from './blocks';

window.onload = () => {
    initStateViewManager(MAIN_MENU_STATE, {
        [MAIN_MENU_STATE]: createMainMenu(),
        [SETTINGS_MENU_STATE]: createSettingsMenu(),
        [SPEED_SETTINGS_MENU_STATE]: createSpeedMenu(),
        [LEFT_EYE_COLOR_PICKER_MENU_STATE]: createLeftEyeColorPickerMenu(),
        [RIGHT_EYE_COLOR_PICKER_MENU_STATE]: createRightEyeColorPickerMenu(),
        [BOARD_SIZE_SETTINGS_STATE]: createBoardSizeSettingsMenu(),
        [BLOCKS_STATE]: createBlocksCanvas(),
        [GAME_OVER_STATE]: createGameOverMenu(),
    });
};
