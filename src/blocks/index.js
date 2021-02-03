import { createElement, requestAnimationFrame } from '../web-api-polyfills';
import { getState, setState } from '../state';
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
    requestAnimationFrame(draw);

    // TODO for testing purposes
    window.onresize = () => {
        const { gameCanvas } = getState();
        setCanvasDimensions(gameCanvas, getCanvasDimensions());
    };
    return canvas;
}
