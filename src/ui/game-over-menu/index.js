import { addStateObserver, getState } from '../../state';
import { MAIN_MENU_STATE } from '../../state/consts';
import { goto } from '../../utils';
import {
    createMenu, createMenuItem, createMenuItemText, createMenuTitle,
} from '../utils';


const getScoreMenuTitle = (score) => `Score: ${score}`;

export default function () {
    const { score: currentScore } = getState();
    const scoreTitle = createMenuItemText(getScoreMenuTitle(currentScore));

    addStateObserver(['score'], ({ score }) => {
        scoreTitle.innerHTML = getScoreMenuTitle(score);
    });

    return createMenu([
        createMenuTitle('Game over'),
        scoreTitle,
        createMenuItem('Back', () => goto(MAIN_MENU_STATE)),
    ]);
}
