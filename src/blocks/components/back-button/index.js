import { MAIN_MENU_STATE } from '../../../state/consts';
import { goto } from '../../../utils';
import createActionButton from '../action-button';

export default function () {
    return createActionButton('back', () => goto(MAIN_MENU_STATE));
}
