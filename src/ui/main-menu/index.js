import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { goto } from '../../utils';

import { SETTINGS_MENU_STATE, ABOUT_INFO_STATE } from '../../state/consts';

export default function () {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Lazy eye blocks'));
    mainMenu.appendChild(createMenuItem('Settings', () => goto(SETTINGS_MENU_STATE)));
    mainMenu.appendChild(createMenuItem('About', () => goto(ABOUT_INFO_STATE)));
    return mainMenu;
}
