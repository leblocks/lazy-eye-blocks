import { getState, setStateAndIgnoreObservers } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
import { calculateCanvasDimensions, setGameBoardGridSizeAndMargins } from '../utils';
import { LEFT_EYE_BOARD_CELL, RIGHT_EYE_BOARD_CELL } from '../utils/consts';


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
 * Draws falling shape on a canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {string} color Color of the shape.
 * @param {Object} shape Shape descriptor object with information about current shape,
 * see createShape()
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 */
function drawShape(ctx, color, shape, xMargin, yMargin, gridFacetSize) {
    const {
        // current shape position
        x,
        y,
        possibleShapeForms,
        currentShapeFormIndex,
    } = shape;

    // set color of the shape to draw
    ctx.fillStyle = color;

    // possibleShapeForms is an array with shape coordinate offsets
    // form is a number of current set of offsets
    // for example, assume that shape type is 'T' and form = 0, x = 4, y = 2
    // that means that possibleShapeForms[currentShapeFormIndex] = [[0,0], [-1,0], [1,0], [0,-1]]
    // (look at SHAPE_FORMS)
    // so on the 'offset matrix' it looks like this:
    //
    //     +-----+-----+-----+
    //     |     |-1, 0|     |
    //     +-----+-----+-----+
    //     | 0,-1| 0, 0|     |
    //     +-----+-----+-----+
    //     |     | 1, 0|     |
    //     +-----+-----+-----+
    //
    // and in order to get actual coordinates of it cells on a board array
    // we need to add x and y to each cell of shape:
    //
    //     +-----+-----+-----+
    //     |     | 3, 2|     |
    //     +-----+-----+-----+
    //     | 4, 1| 4, 2|     |
    //     +-----+-----+-----+
    //     |     | 5, 2|     |
    //     +-----+-----+-----+
    //
    // possibleShapeForms[currentShapeFormIndex][i][0] - x part of the i'th offset
    // possibleShapeForms[currentShapeFormIndex][i][1] - y part of the i'th offset
    // loop through all possible offsets for current form (rotation)
    //  calculate their coordinates and draw them on a canvas
    for (let k = 0; k < possibleShapeForms[currentShapeFormIndex].length; k += 1) {
        // again we add +1 to d in order to get "seamless" picture on the screen
        const actualX = x + possibleShapeForms[currentShapeFormIndex][k][0];
        const actualY = y + possibleShapeForms[currentShapeFormIndex][k][1];
        ctx.fillRect(xMargin + actualX * gridFacetSize,
            yMargin + actualY * gridFacetSize, gridFacetSize + 1, gridFacetSize + 1);
    }
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
            // select correct cell color
            switch (board[i][j]) {
            case LEFT_EYE_BOARD_CELL:
                ctx.fillStyle = leftEyeColor;
                break;
            case RIGHT_EYE_BOARD_CELL:
                ctx.fillStyle = rightEyeColor;
                break;
            default:
                ctx.fillStyle = BACKGROUND_COLOR;
            }
            // for each element containing CELL fill corresponding
            // square on a canvas
            // ctx.fillRect(j*d, i*d, d + 1, d + 1); +1 is to provide
            // seamless picture
            ctx.fillRect(xMargin + j * gridFacetSize,
                yMargin + i * gridFacetSize, gridFacetSize + 1, gridFacetSize + 1);
        }
    }
}


/**
 * Main draw method. Draws everything on a canvas.
 * Calls itself recursively via requestAnimationFrame.
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
        currentShape,
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

    if (currentShape) {
        drawShape(ctx, leftEyeColor, currentShape, xMargin, yMargin, gridFacetSize);
    }

    if (gridEnabled) {
        drawGrid(ctx, columns, rows, xMargin, yMargin, gridFacetSize, canvas.width, canvas.height);
    }

    // call itself in an animation loop and preserve new animation id
    setStateAndIgnoreObservers({ animationId: requestAnimationFrame(draw) });
}

export default draw;
