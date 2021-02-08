import { getState, setStateAndIgnoreObservers } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';

/**
 * TODO check where it should be placed
 * Draws grid on the canvas.
 * @param {*} ctx Canvas 2D context.
 * @param {number} columns Number of rows.
 * @param {number} rows  Number of columns.
 */
function drawGrid(ctx, cols, rows, width, height) {
    // set grid color
    // TODO pull out into config file
    ctx.strokeStyle = 'white';

    // set grid width
    ctx.lineWidth = 2;

    // calculate number of rows
    const d = width / cols;

    // draw vertical lines
    for (let i = 0; i < cols; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * d, 0);
        ctx.lineTo(i * d, height);
        ctx.stroke();
    }


    // draw horizontal lines
    for (let i = height / d; i > 0; i -= 1) {
        ctx.beginPath();
        ctx.moveTo(0, i * d);
        ctx.lineTo(width, i * d);
        ctx.stroke();
    }
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
    } = getState();

    // TODO think about storing it in state
    const ctx = gameCanvas.getContext('2d');

    // clear canvas before next draw iteration
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    if (gridEnabled) {
        drawGrid(ctx, columns, rows, gameCanvas.width, gameCanvas.height);
    }

    // call itself in an animation loop and preserve new animation id
    setStateAndIgnoreObservers({ animationId: requestAnimationFrame(draw) });
}

export default draw;
