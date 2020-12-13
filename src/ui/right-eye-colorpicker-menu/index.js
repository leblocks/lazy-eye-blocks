import { setState } from '../../state';
import { colorPicker, colorIndicator } from '../components';
import { createMenu, createMenuItem, createMenuTitle } from '../utils';

import { RIGHT_EYE_COLOR_SETTINGS_INFO_STATE, SETTINGS_MENU_STATE } from '../../state/consts';

export default function () {
    const rightEyeColorIndicatorId = 'rightEyeColorIndicatorId';
    const rightEyeColorPickerId = 'rightEyeColorPickerId';
    return createMenu([
        createMenuTitle('Right eye color'),
        colorIndicator(rightEyeColorIndicatorId, (state) => state.rightEyeColor),
        colorPicker(rightEyeColorPickerId, (color) => setState({ rightEyeColor: color })),
        createMenuItem('Help', () => setState({ gameState: RIGHT_EYE_COLOR_SETTINGS_INFO_STATE })),
        createMenuItem('Back', () => setState({ gameState: SETTINGS_MENU_STATE })),
    ]);
}
