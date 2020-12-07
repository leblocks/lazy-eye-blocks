import { setState } from '../../state';
import { colorPicker, colorIndicator } from '../components';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';

import { SETTINGS_MENU_STATE } from '../../state/consts';

export default function () {
    const leftEyeColorIndicatorId = 'leftEyeColorIndicatorId';
    const leftEyeColorPickerId = 'leftEyeColorPickerId';
    return createMenu([
        createMenuTitle('Left eye color'),
        colorIndicator(leftEyeColorIndicatorId, (state) => state.leftEyeColor),
        colorPicker(leftEyeColorPickerId, (color) => setState({ leftEyeColor: color })),
        createMenuItem('Back', () => setState({ gameState: SETTINGS_MENU_STATE })),
    ]);
}
