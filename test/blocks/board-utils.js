import {
    clearBoard,
    resizeGameBoard,
    createEmptyBoard,
} from '../../src/blocks/utils';

// chai is loaded in test.html
const { expect } = chai;

describe('board-utils.js tests', () => {
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

    it('clear board 1 - empty', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        expect(clearBoard(board)).to.eq(0);
    });

    it('clear board 2 - partially filled', () => {
        const board = [
            [0, 0, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ];

        const expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 1, 1, 1],
        ];

        expect(clearBoard(board)).to.eq(3);
        expect(board).to.deep.eq(expected);
    });
});
