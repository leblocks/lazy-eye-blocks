// those are shape types:
//  T:   J:   L:   S:   Z:   O:   I:
//
//   X    X   X                   X
//  XXX   X   X    XX    XX  XX   X
//       XX   XX    XX  XX   XX   X
//                                x
//
export const T_SHAPE = 'T';
export const J_SHAPE = 'J';
export const L_SHAPE = 'L';
export const S_SHAPE = 'S';
export const Z_SHAPE = 'Z';
export const O_SHAPE = 'O';
export const I_SHAPE = 'I';

//  this array is being used in random shape generation
//  in order to generate random type we need to choose
//  random element from that array:
//  const randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
export const SHAPE_TYPES = [T_SHAPE, J_SHAPE, L_SHAPE, S_SHAPE, Z_SHAPE, O_SHAPE, I_SHAPE];

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
    [T_SHAPE]: [
        [[0, 0], [-1, 0], [1, 0], [0, -1]],
        [[0, 0], [0, -1], [0, 1], [1, 0]],
        [[0, 0], [-1, 0], [0, 1], [1, 0]],
        [[0, 0], [0, -1], [-1, 0], [0, 1]]],

    [L_SHAPE]: [
        [[0, -1], [0, 0], [0, 1], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [1, -1]],
        [[-1, -1], [0, -1], [0, 0], [0, 1]],
        [[-1, 0], [-1, 1], [0, 0], [1, 0]]],

    [J_SHAPE]: [
        [[-1, 1], [0, 1], [0, 0], [0, -1]],
        [[-1, 0], [0, 0], [1, 0], [1, 1]],
        [[1, -1], [0, -1], [0, 0], [0, 1]],
        [[-1, -1], [-1, 0], [0, 0], [1, 0]]],


    [Z_SHAPE]: [
        [[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[1, -1], [1, 0], [0, 0], [0, 1]],
    ],

    [S_SHAPE]: [
        [[1, -1], [0, -1], [0, 0], [-1, 0]],
        [[0, -1], [0, 0], [1, 0], [1, 1]],
    ],

    [O_SHAPE]: [
        [[-1, -1], [-1, 0], [0, -1], [0, 0]],
    ],

    [I_SHAPE]: [
        [[0, -2], [0, -1], [0, 0], [0, 1]],
        [[-2, 0], [-1, 0], [0, 0], [1, 0]],
    ],

};

// empty board cell
export const EMPTY_BOARD_CELL = 0;
export const LEFT_EYE_BOARD_CELL = 1;
export const RIGHT_EYE_BOARD_CELL = 2;
