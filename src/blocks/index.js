import { createElement } from '../web-api-polyfills';
import { getState, setState } from '../state';
import { setCanvasDimensions, getCanvasDimensions } from './utils';

function initCanvas() {
    const element = createElement('canvas');
    element.setAttribute('class', 'game-canvas');
    element.setAttribute('id', 'canvas');
    element.style.position = 'absolute';
    setCanvasDimensions(element, getCanvasDimensions());
    setState({ gameCanvas: element });
    return element;
}

export default function () {
    // TODO
    // setup here canvas
    // overlay ui elements also
    // back button
    // control buttons for touch events
    // score

    // TODO for testing purposes
    window.onresize = () => {
        const { gameCanvas } = getState();
        setCanvasDimensions(gameCanvas, getCanvasDimensions());
    };
    return initCanvas();
}
