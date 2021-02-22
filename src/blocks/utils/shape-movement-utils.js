/* eslint-disable no-param-reassign */
import checkCollisions from './checkCollisions';

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
