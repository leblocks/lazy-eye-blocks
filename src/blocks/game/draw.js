import { getState, setStateAndIgnoreObservers } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
import { calculateCanvasDimensions, setGameBoardGridSizeAndMargins } from '../utils';
import { FILLED_BOARD_CELL } from '../utils/consts';


const GRID_COLOR = '#ffffff';
const GRID_WIDTH = 1;

const BACKGROUND_COLOR = '#000000';

/**
 * Draws grid on a canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {number} columns Number of rows.
 * @param {number} rows  Number of columns.
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 * @param {number} width Canvas attribute width.
 * @param {number} height Canvas attribute height.
 */
function drawGrid(ctx, columns, rows, xMargin, yMargin, gridFacetSize, width, height) {
    // set grid color
    ctx.strokeStyle = GRID_COLOR;
    // set grid width
    ctx.lineWidth = GRID_WIDTH;

    ctx.beginPath();
    // draw vertical lines
    for (let i = 0; i <= columns; i += 1) {
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
 * Draws game board.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {number[][]} 2d array with numbers that define game board.
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 * @param {string} leftEyeColor
 * @param {string} rightEyeColor
 */
function drawBoard(ctx, board, xMargin, yMargin, gridFacetSize, leftEyeColor, rightEyeColor) {
    const rows = board.length;
    const columns = board[0].length;

    // fill background with specified color
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(xMargin, yMargin, columns * gridFacetSize, rows * gridFacetSize);

    // loop through board array
    for (let i = 0; i < rows; i += 1) {
        for (let j = 0; j < columns; j += 1) {
            // for each element containing CELL fill corresponding
            // square on a canvas
            // ctx.fillRect(j*d, i*d, d + 1, d + 1); +1 is to provide
            // seamless picture
            ctx.fillStyle = board[i][j] === FILLED_BOARD_CELL ? leftEyeColor : rightEyeColor;
            ctx.fillRect(xMargin + j * gridFacetSize,
                yMargin + i * gridFacetSize, gridFacetSize + 1, gridFacetSize + 1);
        }
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
        yMargin,
        xMargin,
        gameBoard,
        gridEnabled,
        leftEyeColor,
        rightEyeColor,
        gridFacetSize,
        gameCanvasWrapper,
        canvasContext: ctx,
        gameCanvas: canvas,
    } = getState();

    // TODO I have an issue here with canvas resizing. Needs to be solved.
    // recalculate on first render
    const { height } = gameCanvasWrapper.getBoundingClientRect();
    if (Math.abs(canvas.height - height) > 10) {
        calculateCanvasDimensions();
        setGameBoardGridSizeAndMargins();
    }

    // clear canvas before next draw iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    drawBoard(ctx, gameBoard, xMargin, yMargin, gridFacetSize, leftEyeColor, rightEyeColor);

    if (gridEnabled) {
        drawGrid(ctx, columns, rows, xMargin, yMargin, gridFacetSize, canvas.width, canvas.height);
    }

    // call itself in an animation loop and preserve new animation id
    setStateAndIgnoreObservers({ animationId: requestAnimationFrame(draw) });
}

export default draw;
