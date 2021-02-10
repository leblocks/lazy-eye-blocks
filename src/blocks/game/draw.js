import { getState, setStateAndIgnoreObservers } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
import { calculateCanvasDimensions } from '../utils';

/**
 * Draws grid on the canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {number} columns Number of rows.
 * @param {number} rows  Number of columns.
 */
function drawGrid(ctx, cols, rows, width, height) {
    // set grid color
    ctx.strokeStyle = '#ffffff';
    // set grid width
    ctx.lineWidth = 2;

    const gridFacetSize = Math.min(width, height) / Math.max(cols, rows);

    const xMargin = (width - gridFacetSize * cols) / 2;
    const yMargin = (height - gridFacetSize * rows) / 2;

    ctx.beginPath();
    // draw vertical lines
    for (let i = 0; i <= cols; i += 1) {
        const x = xMargin + i * gridFacetSize;
        ctx.moveTo(x, yMargin);
        ctx.lineTo(x, height - yMargin);
    }

    // draw horizontal lines
    for (let i = rows; i >= 0; i -= 1) {
        const y = yMargin + i * gridFacetSize;
        ctx.moveTo(xMargin, y);
        ctx.lineTo(width - xMargin, y);
    }
    ctx.closePath();
    ctx.stroke();
}


/**
 * Main draw method.
 * Draws everything on a canvas.
 */
function draw() {
    const {
        rows,
        columns,
        gameCanvas,
        gridEnabled,
        canvasContext,
        gameCanvasWrapper,
    } = getState();

    // TODO solve this issue
    // recalculate on first render
    const { height } = gameCanvasWrapper.getBoundingClientRect();
    if (Math.abs(gameCanvas.height - height) > 10) {
        calculateCanvasDimensions();
    }

    // clear canvas before next draw iteration
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    if (gridEnabled) {
        drawGrid(canvasContext, columns, rows, gameCanvas.width, gameCanvas.height);
    }

    // call itself in an animation loop and preserve new animation id
    setStateAndIgnoreObservers({ animationId: requestAnimationFrame(draw) });
}

export default draw;
