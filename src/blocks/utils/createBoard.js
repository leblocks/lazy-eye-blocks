import { EMPTY_BOARD_CELL, FILLED_BOARD_CELL } from './consts';

/**
 * Creates game board.
 * @param {number} columns Number of columns.
 * @param {number} rows Number of rows.
 */
export default function (columns, rows) {
    const board = [];
    for (let i = 0; i < rows; i += 1) {
        const row = [];
        for (let j = 0; j < columns; j += 1) {
            // this is for test
            row.push(Math.random() > 0.5 ? EMPTY_BOARD_CELL : FILLED_BOARD_CELL);
        }
        board.push(row);
    }
    return board;
}
