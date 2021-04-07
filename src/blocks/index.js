import {
    getClassList,
    createElement,
} from '../web-api-polyfills';

import {
    createScoreInfo,
    createLevelInfo,
    createBackButton,
    createFireButton,
    createGameCanvas,
    createRotateButton,
    createMoveLeftButton,
    createMoveRightButton,
    createPlayPauseButton,
    createRestartGameButton,
} from './components';

import initGame from './game';
import { registerTouchEventListener } from './utils';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const firstRowOfButtons = createElement('div');
    getClassList(firstRowOfButtons).add('action-button-row');
    firstRowOfButtons.appendChild(createRotateButton());
    firstRowOfButtons.appendChild(createScoreInfo());
    firstRowOfButtons.appendChild(createLevelInfo());
    firstRowOfButtons.appendChild(createFireButton());

    const secondRowOfButtons = createElement('div');
    getClassList(secondRowOfButtons).add('action-button-row');
    secondRowOfButtons.appendChild(createBackButton());
    secondRowOfButtons.appendChild(createMoveLeftButton());
    secondRowOfButtons.appendChild(createPlayPauseButton());
    secondRowOfButtons.appendChild(createMoveRightButton());
    secondRowOfButtons.appendChild(createRestartGameButton());

    const canvas = createGameCanvas();
    registerTouchEventListener(canvas);

    const container = createElement('div');
    getClassList(container).add('game-container');
    container.appendChild(canvas);
    container.appendChild(firstRowOfButtons);
    container.appendChild(secondRowOfButtons);

    initGame();
    return container;
}
