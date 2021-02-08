import { setState } from '../state';
import {
    getClassList,
    createElement,
} from '../web-api-polyfills';

import {
    createBackButton,
    createFireButton,
    createRotateButton,
    createMoveLeftButton,
    createMoveRightButton,
} from './components';

import initGame from './game';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const gameCanvas = createElement('canvas');
    getClassList(gameCanvas).add('game-canvas');
    gameCanvas.getContext('2d').scale(0.5, 0.5);

    const firstRowOfButtons = createElement('div');
    getClassList(firstRowOfButtons).add('action-button-row');
    firstRowOfButtons.appendChild(createRotateButton());
    firstRowOfButtons.appendChild(createFireButton());

    const secondRowOfButtons = createElement('div');
    getClassList(secondRowOfButtons).add('action-button-row');
    secondRowOfButtons.appendChild(createMoveLeftButton());
    secondRowOfButtons.appendChild(createBackButton());
    secondRowOfButtons.appendChild(createMoveRightButton());

    const container = createElement('div');
    getClassList(container).add('game-container');
    container.appendChild(gameCanvas);
    container.appendChild(firstRowOfButtons);
    container.appendChild(secondRowOfButtons);

    // store reference to the canvas in the state
    setState({ gameCanvas });
    initGame();

    return container;
}
