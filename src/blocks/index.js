import {
    getClassList,
    createElement,
} from '../web-api-polyfills';

import {
    createScoreInfo,
    createBackButton,
    createFireButton,
    createGameCanvas,
    createRotateButton,
    createMoveLeftButton,
    createMoveRightButton,
} from './components';

import initGame from './game';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const firstRowOfButtons = createElement('div');
    getClassList(firstRowOfButtons).add('action-button-row');
    firstRowOfButtons.appendChild(createRotateButton());
    firstRowOfButtons.appendChild(createScoreInfo());
    firstRowOfButtons.appendChild(createFireButton());

    const secondRowOfButtons = createElement('div');
    getClassList(secondRowOfButtons).add('action-button-row');
    secondRowOfButtons.appendChild(createMoveLeftButton());
    secondRowOfButtons.appendChild(createBackButton());
    secondRowOfButtons.appendChild(createMoveRightButton());

    const container = createElement('div');
    getClassList(container).add('game-container');
    container.appendChild(createGameCanvas());
    container.appendChild(firstRowOfButtons);
    container.appendChild(secondRowOfButtons);

    initGame();

    return container;
}
