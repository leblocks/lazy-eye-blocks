import { setState } from '../../state';
import { colorPicker, colorIndicator } from '../components';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';
import { goto } from '../../utils';

import { LEFT_EYE_COLOR_SETTINGS_INFO_STATE, SETTINGS_MENU_STATE } from '../../state/consts';

export default function () {
    return createMenu([
        createMenuTitle('Left eye color'),
        colorIndicator((state) => state.leftEyeColor),
        colorPicker((color) => setState({ leftEyeColor: color })),
        createMenuItem('Help', () => goto(LEFT_EYE_COLOR_SETTINGS_INFO_STATE)),
        createMenuItem('Back', () => goto(SETTINGS_MENU_STATE)),
    ]);
}
