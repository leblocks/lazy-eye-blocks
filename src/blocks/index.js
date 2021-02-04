import { createElement, getClassList } from '../web-api-polyfills';
import {
    createBackButton,
    createFireButton,
    createRotateButton,
    createMoveLeftButton,
    createMoveRightButton,
} from './components';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const canvas = createElement('canvas');
    getClassList(canvas).add('game-canvas');

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
    container.appendChild(canvas);
    container.appendChild(firstRowOfButtons);
    container.appendChild(secondRowOfButtons);

    return container;
}
