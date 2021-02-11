import { createEmptyBoard, resizeGameBoard } from '../../../src/blocks/utils';
import { EMPTY_BOARD_CELL, LEFT_EYE_BOARD_CELL } from '../../../src/blocks/utils/consts';

// chai is loaded in test.html
const { expect } = chai;

describe('Blocks utility method tests', () => {
    it('create empty board', () => {
        const expected = [
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
        ];
        expect(createEmptyBoard(3, 3)).to.deep.eq(expected);
    });

    it('resize existing board', () => {
        // TODO write more cases
        const original = [
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
            [EMPTY_BOARD_CELL, LEFT_EYE_BOARD_CELL, EMPTY_BOARD_CELL],
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
        ];

        const expected = [
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
            [LEFT_EYE_BOARD_CELL, EMPTY_BOARD_CELL],
            [EMPTY_BOARD_CELL, EMPTY_BOARD_CELL],
        ];
        expect(resizeGameBoard(original, 2, 3)).to.deep.eq(expected);
    });
});
