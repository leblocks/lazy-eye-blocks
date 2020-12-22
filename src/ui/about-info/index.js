/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import { createInfo } from '../components';
import { setState } from '../../state';

import { MAIN_MENU_STATE } from '../../state/consts';

// load html as a string with html-loader
import about from '!html-loader!./index.html';

export default function () {
    return createInfo(about, () => setState({ gameState: MAIN_MENU_STATE }));
}
