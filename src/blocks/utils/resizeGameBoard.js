import createEmptyBoard from './createEmptyBoard';

/**
 * Resizes given board according to provided column and row count.
 * @param {number[][]} board 2d array which represents board.
 * @param {number} columns New column count.
 * @param {number} rows New row count.
 */
export default function (board, columns, rows) {
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
}
