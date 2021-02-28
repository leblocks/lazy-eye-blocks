import { getShapeCoordinatesOnBoard } from './board-utils';
import { EMPTY_BOARD_CELL } from './consts';

/**
 * Collision detection function
 * detects collision between falling blocks
 * and walls\ground blocks
 * returns true in case there is a collision
 * @param {Object} shape Shape object representation.
 * @param {number[][]} board 2d array that represents game board.
 */
export default function (shape, board) {
    // get number of columns
    const cols = board[0].length;
    // get number of rows
    const rows = board.length;

    return getShapeCoordinatesOnBoard(shape)
        // we collide even on one cell collision
        .some(([x, y]) => {
            // check for collision with walls
            if (x > cols - 1 || x < 0 || y > rows - 1) {
                return true;
            }

            // check for collision with ground blocks
            if (y > 0 && board[y][x] !== EMPTY_BOARD_CELL) {
                return true;
            }

            // no collisions at all
            return false;
        });
}
