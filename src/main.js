import './icon.ico';
import './main.scss';
import './index.html';

import {
    createMenu,
    createMenuItem,
    createMenuTitle,
    initStateViewManager,
} from './ui';

import { setState } from './state';
import { MAIN_MENU_STATE, SETTINGS_MENU_STATE } from './state/consts';

window.onload = () => {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Main menu'));
    mainMenu.appendChild(createMenuItem('Settings', () => setState({ gameState: SETTINGS_MENU_STATE })));


    const settingsMenu = createMenu();
    settingsMenu.appendChild(createMenuTitle('Settings'));
    settingsMenu.appendChild(createMenuItem('Back', () => setState({ gameState: MAIN_MENU_STATE })));

    const map = {
        [MAIN_MENU_STATE]: mainMenu,
        [SETTINGS_MENU_STATE]: settingsMenu,
    };
    initStateViewManager(MAIN_MENU_STATE, map);
};
