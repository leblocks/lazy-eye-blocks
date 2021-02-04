import { getState } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
import { setappState } from '../appState';
import drawGrid from './drawGrid';

/**
 * Main draw method.
 * Draws everything on a canvas.
 */
function draw() {
    const {
        rows,
        columns,
        gameCanvas,
        gameCanvasContext,
    } = getState();

    // clear canvas before next draw iteration
    gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawGrid(gameCanvasContext, columns, rows, gameCanvas.width, gameCanvas.height);

    setappState({ animationId: requestAnimationFrame(draw) });
}

export default draw;
