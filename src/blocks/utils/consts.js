// those are shape types:
//  T:   J:   L:   S:   Z:   O:   I:
//
//   X    X   X                   X
//  XXX   X   X    XX    XX  XX   X
//       XX   XX    XX  XX   XX   X
//                                x
//
//  this array is being used in random shape generation
//  in order to generate random type we need to choose
//  random element from that array:
//  var randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
export const SHAPE_TYPES = ['T', 'J', 'L', 'S', 'Z', 'O', 'I'];

// this object stores possible shape forms for rotation function
// for example, 'T' shape has possible forms:
//
//  +---------------------+
//  |   X     x        x  |
//  |  XXX   xx   xxx  xx |
//  |         x    x   x  |
//  +---------------------+
//
// every shape has 2D array with offsets of coordinates of each block of the shape
// relative to its center (except for 'I' shape), offsets a defined by 3x3 matrix:
//
// +--------+-------+-------+
// | -1, -1 | -1, 0 | -1, 1 |
// +--------+-------+-------+
// |  0, -1 |  0, 0 |  0, 1 |
// +--------+-------+-------+
// |  1, -1 |  1, 0 |  1, 1 |
// +--------+-------+-------+
//
// where: i - row number, j - column number
//     +-----+
//     | i, j|
//     +-----+
//
// example: shape coordinates are x = 5 and y = 3, to find coordinates of each
// other cell of the shape we need to sum x with j and y with i see drawShape() function
export const SHAPE_FORMS = {
    T: [
        [[0, 0], [-1, 0], [1, 0], [0, -1]],
        [[0, 0], [0, -1], [0, 1], [1, 0]],
        [[0, 0], [-1, 0], [0, 1], [1, 0]],
        [[0, 0], [0, -1], [-1, 0], [0, 1]]],

    L: [
        [[0, -1], [0, 0], [0, 1], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [1, -1]],
        [[-1, -1], [0, -1], [0, 0], [0, 1]],
        [[-1, 0], [-1, 1], [0, 0], [1, 0]]],

    J: [
        [[-1, 1], [0, 1], [0, 0], [0, -1]],
        [[-1, 0], [0, 0], [1, 0], [1, 1]],
        [[1, -1], [0, -1], [0, 0], [0, 1]],
        [[-1, -1], [-1, 0], [0, 0], [1, 0]]],


    Z: [[[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[1, -1], [1, 0], [0, 0], [0, 1]]],

    S: [
        [[1, -1], [0, -1], [0, 0], [-1, 0]],
        [[0, -1], [0, 0], [1, 0], [1, 1]]],

    O: [
        [[-1, -1], [-1, 0], [0, -1], [0, 0]]],

    I: [
        [[0, -2], [0, -1], [0, 0], [0, 1]],
        [[-2, 0], [-1, 0], [0, 0], [1, 0]]],

};

// empty board cell
export const EMPTY_BOARD_CELL = 0;
// represents board cell with something in it
export const FILLED_BOARD_CELL = 1;
