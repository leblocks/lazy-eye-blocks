import { createElement, requestAnimationFrame } from '../web-api-polyfills';
import { addStateObserver, getState, setState } from '../state';
import { BLOCKS_STATE } from '../state/consts';
import { setCanvasDimensions, getCanvasDimensions } from './utils';
import { draw } from './draw';

function initCanvas() {
    const element = createElement('canvas');
    element.setAttribute('class', 'game-canvas');
    element.style.position = 'absolute';
    setCanvasDimensions(element, getCanvasDimensions());
    setState({ gameCanvas: element, gameCanvasContext: element.getContext('2d') });
    return element;
}

export default function () {
    // TODO
    // setup here canvas
    // overlay ui elements also
    // back button
    // control buttons for touch events
    // score
    const canvas = initCanvas();

    // TODO think about game state management
    // This is for tests init draw loop
    addStateObserver(({ gameState }) => {
        if (gameState === BLOCKS_STATE) {
            // start animation
            // start game logic
            requestAnimationFrame(draw);
        } else {
            // stop here animation
            // stop here game logic
        }
    });

    // TODO for testing purposes
    window.onresize = () => {
        const { gameCanvas } = getState();
        setCanvasDimensions(gameCanvas, getCanvasDimensions());
    };
    return canvas;
}
