import { EMPTY_BOARD_CELL } from './consts';
import { getState, setStateAndIgnoreObservers } from '../../state';

/**
 * Creates empty game board.
 * @param {number} columns Number of columns.
 * @param {number} rows Number of rows.
 */
export const createEmptyBoard = (columns, rows) => {
    const board = [];
    for (let i = 0; i < rows; i += 1) {
        const row = [];
        for (let j = 0; j < columns; j += 1) {
            // this is for test
            row.push(EMPTY_BOARD_CELL);
        }
        board.push(row);
    }
    return board;
};

/**
 * Resizes given board according to provided column and row count.
 * @param {number[][]} board 2d array which represents board.
 * @param {number} columns New column count.
 * @param {number} rows New row count.
 */
export const resizeGameBoard = (board, columns, rows) => {
    const oldRowCount = board.length;
    const oldColumnCount = board[0].length;

    const columnDiff = columns - oldColumnCount;
    const rowDiff = rows - oldRowCount;

    const newBoard = createEmptyBoard(columns, rows);
    for (let i = rows - 1; i >= 0; i -= 1) {
        for (let j = columns - 1; j >= 0; j -= 1) {
            const originalRowIndex = i - rowDiff;
            const originalColumnIndex = j - columnDiff;

            const isValidRowIndex = originalRowIndex >= 0
                && originalRowIndex < oldRowCount;
            const isValidColumnIndex = originalColumnIndex >= 0
                && originalColumnIndex < oldColumnCount;

            if (isValidColumnIndex && isValidRowIndex) {
                newBoard[i][j] = board[i - rowDiff][j - columnDiff];
            }
        }
    }
    return newBoard;
};

/**
 * Setups margins and grid size according to canvas dimensions.
 */
export const setGameBoardGridSizeAndMargins = () => {
    const {
        rows,
        columns,
        gameCanvas: { width, height },
    } = getState();

    const gridFacetSize = Math.min(width, height) / Math.max(columns, rows);

    const xMargin = (width - gridFacetSize * columns) / 2;
    const yMargin = (height - gridFacetSize * rows) / 2;

    setStateAndIgnoreObservers({
        yMargin,
        xMargin,
        gridFacetSize,
    });
};

/**
 * // TODO write tests!
 * Calculates coordinates of shape cells on a board.
 * @param {Object} shape Shape object representation.
 * @param {number[][]} board 2d array that represents game board.
 * @return {number[][]} Arrays of shape cells coordinates on a board.
 * Relatively to left upper corner of the board.
 */
export const getShapeCoordinatesOnBoard = (shape) => {
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
    const {
        // current shape position
        x,
        y,
        possibleShapeForms,
        currentShapeFormIndex,
    } = shape;

    return possibleShapeForms[currentShapeFormIndex]
        .map((shapeCell) => [x + shapeCell[0], y + shapeCell[1]]);
};
