import { getState } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
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

    // TODO where to store animation id?
    // TODO store animation id!
    requestAnimationFrame(draw);
}

export default draw;
