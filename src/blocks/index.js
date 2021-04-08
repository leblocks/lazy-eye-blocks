import {
    getClassList,
    createElement,
} from '../web-api-polyfills';

import {
    createScoreInfo,
    createLevelInfo,
    createBackButton,
    createGameCanvas,
    createPlayPauseButton,
    createRestartGameButton,
} from './components';

import initGame from './game';
import { registerTouchEventListener } from './utils';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const canvas = createGameCanvas();
    registerTouchEventListener(canvas);

    const actionButtons = createElement('div');
    getClassList(actionButtons).add('action-button-row');
    actionButtons.appendChild(createPlayPauseButton());
    actionButtons.appendChild(createRestartGameButton());
    actionButtons.appendChild(createBackButton());
    actionButtons.appendChild(createScoreInfo());
    actionButtons.appendChild(createLevelInfo());

    const container = createElement('div');
    getClassList(container).add('game-container');
    container.appendChild(actionButtons);
    container.appendChild(canvas);

    initGame();
    return container;
}
