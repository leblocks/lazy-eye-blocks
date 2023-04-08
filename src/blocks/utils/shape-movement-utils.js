/* eslint-disable no-param-reassign */
import { EMPTY_BOARD_CELL } from './consts';

/**
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

/**
 * Collision detection function
 * detects collision between falling blocks
 * and walls\ground blocks
 * returns true in case there is a collision
 * @param {Object} shape Shape object representation.
 * @param {number[][]} board 2d array that represents game board.
 */
export const checkCollisions = (shape, board) => {
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
};

/**
 * Tries to safely move shape by updating its coordinates.
 * In case of collision will do nothing.
 * @param {Object} shape Shape object representation.
 * @param {number[][]} board 2d array that represents game board.
 * @param {number} dx x coordinate increment.
 * @param {number} dy y coordinate increment.
 */
function moveShape(shape, board, dx, dy) {
    shape.x += dx;
    shape.y += dy;

    if (checkCollisions(shape, board)) {
        // if shape collides with something
        // return old coordinates
        shape.x -= dx;
        shape.y -= dy;
    }
}

export const moveShapeLeft = (shape, board) => moveShape(shape, board, -1, 0);
export const moveShapeRight = (shape, board) => moveShape(shape, board, 1, 0);
export const moveShapeDown = (shape, board) => moveShape(shape, board, 0, 1);

export const fireDown = (shape, board) => {
    // until collision happens
    while (!checkCollisions(shape, board)) {
        // move shape down by 1
        shape.y += 1;
    }
    // lift shape after last collision, if we won't do
    // this shape will remain 'drowned' by 1 in a wall of in the
    // other shape
    shape.y -= 1;
};

export const rotateShape = (shape, board) => {
    // get all possible forms of given shape
    const { possibleShapeForms, currentShapeFormIndex } = shape;

    // we are "looping" through all possible shape forms
    // if it is already at its last form -> set it to 0 (first)
    // else set next form
    if (currentShapeFormIndex === possibleShapeForms.length - 1) {
        // reset
        shape.currentShapeFormIndex = 0;
    } else {
        // move to next
        shape.currentShapeFormIndex += 1;
    }

    // check if new 'rotated' shape is colliding with something
    // if yes -> return previous form
    if (checkCollisions(shape, board)) {
        // restore old one
        shape.currentShapeFormIndex = currentShapeFormIndex;
    }
};
