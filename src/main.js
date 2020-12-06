import './icon.ico';
import './main.scss';
import './index.html';

import {
    initStateViewManager,
    createSettingsMenu,
    createSpeedMenu,
} from './ui';

import { createMenu, createMenuItem, createMenuTitle } from './ui/utils';

import { setState } from './state';
import { SPEED_SETTINGS_MENU_STATE, MAIN_MENU_STATE, SETTINGS_MENU_STATE } from './state/consts';

window.onload = () => {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Main menu'));
    mainMenu.appendChild(createMenuItem('Settings', () => setState({ gameState: SETTINGS_MENU_STATE })));

    const map = {
        [MAIN_MENU_STATE]: mainMenu,
        [SETTINGS_MENU_STATE]: createSettingsMenu(),
        [SPEED_SETTINGS_MENU_STATE]: createSpeedMenu(),
    };
    initStateViewManager(MAIN_MENU_STATE, map);
};
