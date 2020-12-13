/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import { createInfo } from '../components';
import { RIGHT_EYE_COLOR_PICKER_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';

// load html as string with html-loader
import colorSettings from '!html-loader!./index.html';

export default function () {
    return createInfo(colorSettings, () => goto(RIGHT_EYE_COLOR_PICKER_MENU_STATE));
}
