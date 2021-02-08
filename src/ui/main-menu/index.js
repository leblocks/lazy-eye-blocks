import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { goto } from '../../utils';

import {
    BLOCKS_STATE,
    ABOUT_INFO_STATE,
    BLOCKS_GAME_PLAYING,
    SETTINGS_MENU_STATE,
} from '../../state/consts';

import { setState } from '../../state';

const newGameButtonHandler = () => {
    setState({ appState: BLOCKS_STATE, gameState: BLOCKS_GAME_PLAYING });
};

export default function () {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Lazy eye blocks'));
    mainMenu.appendChild(createMenuItem('New game', newGameButtonHandler));
    mainMenu.appendChild(createMenuItem('Settings', () => goto(SETTINGS_MENU_STATE)));
    mainMenu.appendChild(createMenuItem('About', () => goto(ABOUT_INFO_STATE)));
    return mainMenu;
}
