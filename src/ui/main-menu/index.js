import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { goto } from '../../utils';

import { createNewGameButton } from '../components';

import { SETTINGS_MENU_STATE } from '../../state/consts';

export default function () {
    const mainMenu = createMenu();
    mainMenu.appendChild(createMenuTitle('Lazy eye blocks'));
    mainMenu.appendChild(createNewGameButton());
    mainMenu.appendChild(createMenuItem('Settings', () => goto(SETTINGS_MENU_STATE)));
    return mainMenu;
}
