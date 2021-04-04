import { setState } from '../../state';
import { colorPicker, colorIndicator } from '../components';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';

import { SETTINGS_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';

export default function () {
    return createMenu([
        createMenuTitle('Right eye color'),
        colorIndicator((state) => state.rightEyeColor),
        colorPicker((color) => setState({ rightEyeColor: color })),
        createMenuItem('Back', () => goto(SETTINGS_MENU_STATE)),
    ]);
}
