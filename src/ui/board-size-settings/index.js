import { SETTINGS_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';

export default function () {
    return createMenu([
        createMenuTitle('Board size'),
        createMenuItem('Back', () => goto(SETTINGS_MENU_STATE)),
    ]);
}
