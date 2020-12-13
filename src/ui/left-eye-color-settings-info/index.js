/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import { createInfo } from '../components';
import { LEFT_EYE_COLOR_PICKER_MENU_STATE } from '../../state/consts';

// load html as string with html-loader
import colorSettings from '!html-loader!./index.html';
import { goto } from '../../utils';

export default function () {
    return createInfo(colorSettings, () => goto(LEFT_EYE_COLOR_PICKER_MENU_STATE));
}
