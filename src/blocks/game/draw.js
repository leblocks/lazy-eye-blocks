import { getState, setStateSilently } from '../../state';
import { requestAnimationFrame } from '../../web-api-polyfills';
import {
    getNumberOfLinesNeeded,
    calculateCanvasDimensions,
    getShapeCoordinatesOnBoard,
    setGameBoardGridSizeAndMargins,
} from '../utils';
import { LEFT_EYE_BOARD_CELL, RIGHT_EYE_BOARD_CELL } from '../utils/consts';

import {
    GRID_COLOR,
    GRID_WIDTH,
    BACKGROUND_COLOR,
    NEXT_SHAPE_COLOR,
    NEXT_SHAPE_DRAW_SCALE,
    PROGRESS_BAR_WIDTH,
} from '../../config';

const ACTUAL_DRAW_SCALE = 1 / NEXT_SHAPE_DRAW_SCALE;

const cellToColor = (cell, leftEyeColor, rightEyeColor) => {
    switch (cell) {
    case LEFT_EYE_BOARD_CELL:
        return leftEyeColor;
    case RIGHT_EYE_BOARD_CELL:
        return rightEyeColor;
    default:
        return BACKGROUND_COLOR;
    }
};

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
    for (let i = 1; i < columns; i += 1) {
        const x = xMargin + i * gridFacetSize;
        ctx.moveTo(x, yMargin);
        ctx.lineTo(x, height - yMargin);
    }

    // draw horizontal lines
    for (let i = rows - 1; i > 0; i -= 1) {
        const y = yMargin + i * gridFacetSize;
        ctx.moveTo(xMargin, y);
        ctx.lineTo(width - xMargin, y);
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * Draws game area border on a canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {number} columns Number of rows.
 * @param {number} rows  Number of columns.
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 */
function drawBorder(ctx, columns, rows, xMargin, yMargin, gridFacetSize) {
    // same as grid style
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = GRID_WIDTH;
    ctx.strokeRect(xMargin, yMargin, columns * gridFacetSize, rows * gridFacetSize);
}

/**
 * Draws game area border on a canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {number} columns Number of rows.
 * @param {number} rows  Number of columns.
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 * @param {number} currentSpeedLevel Current speed level.
 * @param {number} linesCleared Number of lines cleared.
 */
function drawLevelProgressBar(
    ctx,
    columns,
    rows,
    leftEyeColor,
    rightEyeColor,
    xMargin,
    yMargin,
    gridFacetSize,
    currentSpeedLevel,
    linesCleared,
) {
    const height = rows * gridFacetSize;
    const width = columns * gridFacetSize;
    const completedPart = width * (linesCleared / getNumberOfLinesNeeded(currentSpeedLevel));

    // draw whole progress bar
    ctx.beginPath();
    ctx.lineWidth = PROGRESS_BAR_WIDTH;
    ctx.strokeStyle = leftEyeColor;
    ctx.moveTo(xMargin, yMargin + height);
    ctx.lineTo(xMargin + width, yMargin + height);
    ctx.closePath();
    ctx.stroke();

    // draw completed part only
    ctx.beginPath();
    ctx.strokeStyle = rightEyeColor;
    ctx.moveTo(xMargin, yMargin + height);
    ctx.lineTo(xMargin + completedPart, yMargin + height);
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
function drawShape(
    ctx,
    color,
    shape,
    xMargin,
    yMargin,
    gridFacetSize,
    leftEyeColor,
    rightEyeColor,
) {
    getShapeCoordinatesOnBoard(shape)
        .forEach(([x, y], cellIndex) => {
            if (y < 0) {
                // do not draw shape parts that are not on the board
                return;
            }

            const actualX = xMargin + x * gridFacetSize;
            const actualY = yMargin + y * gridFacetSize;
            const cell = shape.colors[cellIndex];
            ctx.fillStyle = color || cellToColor(cell, leftEyeColor, rightEyeColor);
            ctx.fillRect(actualX, actualY, gridFacetSize + 1, gridFacetSize + 1);
        });
}

/**
 * Draws next shape on a canvas.
 * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
 * @param {Object} shape Shape descriptor object with information about next shape,
 * see createShape()
 * @param {number} xMargin X margin between canvas left border and content to draw.
 * @param {number} yMargin Y margin between canvas top border and content to draw.
 * @param {number} gridFacetSize Size of the grid.
 */
function drawNextShape(ctx, shape, xMargin, yMargin, gridFacetSize, leftEyeColor, rightEyeColor) {
    ctx.scale(NEXT_SHAPE_DRAW_SCALE, NEXT_SHAPE_DRAW_SCALE);
    drawShape(
        ctx,
        NEXT_SHAPE_COLOR,
        { ...shape, x: 3, y: 3 },
        xMargin * ACTUAL_DRAW_SCALE,
        yMargin * ACTUAL_DRAW_SCALE,
        gridFacetSize,
        leftEyeColor,
        rightEyeColor,
    );
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
            ctx.fillStyle = cellToColor(board[i][j], leftEyeColor, rightEyeColor);
            // for each element containing CELL fill corresponding
            // square on a canvas
            // ctx.fillRect(j*d, i*d, d + 1, d + 1); +1 is to provide
            // seamless picture
            ctx.fillRect(
                xMargin + j * gridFacetSize,
                yMargin + i * gridFacetSize,
                gridFacetSize + 1,
                gridFacetSize + 1,
            );
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
        nextShape,
        speedLevel,
        gridEnabled,
        leftEyeColor,
        linesCleared,
        currentShape,
        rightEyeColor,
        gridFacetSize,
        gameCanvasWrapper,
        canvasContext: ctx,
        gameCanvas: canvas,
        increaseSpeedLevel,
        shouldCallResizeOnDraw,
    } = getState();

    // TODO I have an issue here with canvas resizing. Needs to be solved.
    // recalculate on first render
    const { height } = gameCanvasWrapper.getBoundingClientRect();
    if (Math.abs(canvas.height - height) > 100) {
        calculateCanvasDimensions();
        setGameBoardGridSizeAndMargins();
    }

    // call window resize in case if board was resized
    // to adjust to a new board size
    if (shouldCallResizeOnDraw) {
        window.onresize();
    }

    // clear canvas before next draw iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(ctx, gameBoard, xMargin, yMargin, gridFacetSize, leftEyeColor, rightEyeColor);
    drawBorder(ctx, columns, rows, xMargin, yMargin, gridFacetSize);

    if (currentShape) {
        drawShape(
            ctx,
            null,
            currentShape,
            xMargin,
            yMargin,
            gridFacetSize,
            leftEyeColor,
            rightEyeColor,
        );
    }

    if (nextShape) {
        const shapeToDraw = currentShape.y < 0 ? currentShape : nextShape;
        drawNextShape(
            ctx,
            shapeToDraw,
            xMargin,
            yMargin,
            gridFacetSize,
            leftEyeColor,
            rightEyeColor,
        );
    }

    if (gridEnabled) {
        drawGrid(ctx, columns, rows, xMargin, yMargin, gridFacetSize, canvas.width, canvas.height);
    }

    if (increaseSpeedLevel) {
        // no need to draw progress bar if speed level is locked
        drawLevelProgressBar(
            ctx,
            columns,
            rows,
            leftEyeColor,
            rightEyeColor,
            xMargin,
            yMargin,
            gridFacetSize,
            speedLevel,
            linesCleared,
        );
    }

    // call itself in an animation loop and preserve new animation id
    setStateSilently({
        animationId: requestAnimationFrame(draw),
        shouldCallResizeOnDraw: false,
    });
}

export default draw;
