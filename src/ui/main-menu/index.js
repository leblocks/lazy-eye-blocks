import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { goto } from '../../utils';

import { createNewGameButton } from '../components';

import {
    ABOUT_INFO_STATE,
    SETTINGS_MENU_STATE,
} from '../../state/consts';


export default function () {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Lazy eye blocks'));
    mainMenu.appendChild(createNewGameButton());
    mainMenu.appendChild(createMenuItem('Settings', () => goto(SETTINGS_MENU_STATE)));
    mainMenu.appendChild(createMenuItem('About', () => goto(ABOUT_INFO_STATE)));
    return mainMenu;
}
