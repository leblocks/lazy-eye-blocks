import {
    createShape,
    checkCollisions,
    resizeGameBoard,
    createEmptyBoard,
} from '../../../src/blocks/utils';

// chai is loaded in test.html
const { expect } = chai;

describe('Blocks utility method tests', () => {
    it('create empty board', () => {
        const expected = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        expect(createEmptyBoard(3, 3)).to.deep.eq(expected);
    });

    it('shrink existing board', () => {
        const original = [
            [0, 0, 1],
            [0, 1, 0],
            [1, 1, 1],
        ];

        const expected = [
            [0, 1],
            [1, 0],
            [1, 1],
        ];
        expect(resizeGameBoard(original, 2, 3)).to.deep.eq(expected);
    });

    it('extend existing board', () => {
        const original = [
            [0, 0, 1],
            [0, 1, 0],
            [1, 1, 1],
        ];

        const expected = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1],
        ];
        expect(resizeGameBoard(original, 5, 5)).to.deep.eq(expected);
    });

    it('create shape', () => {
        // TODO
    });

    it('check collisions', () => {
        // TODO with walls
        // TODO with various board elements
    });
});
