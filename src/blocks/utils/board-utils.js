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
