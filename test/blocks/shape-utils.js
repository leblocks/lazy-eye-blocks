import {
    createShape,
    checkCollisions,
    createEmptyBoard,
    getShapeCoordinatesOnBoard,
} from '../../src/blocks/utils';

import {
    L_SHAPE,
    T_SHAPE,
    O_SHAPE,
    SHAPE_FORMS,
} from '../../src/blocks/utils/consts';

// chai is loaded in test.html
const { expect } = chai;

describe('shape-utils.js tests', () => {
    it('create shape', () => {
        const shape = createShape(L_SHAPE, 10);
        expect(shape.type).to.eq(L_SHAPE);
        expect(shape.x).to.eq(5);
        expect(shape.y).to.eq(-4);
        expect(shape.possibleShapeForms).to.deep.eq(SHAPE_FORMS[L_SHAPE]);
    });

    it('check collisions empty board', () => {
        const columns = 10;
        const rows = 10;
        const board = createEmptyBoard(columns, rows);
        const shape = createShape(T_SHAPE, columns);

        expect(checkCollisions(shape, board)).to.eq(false, 'no collisions expected');

        // lets "move" our shape around
        shape.x = 0;
        expect(checkCollisions(shape, board)).to.eq(true, 'expected collision with left wall');

        shape.x = 9;
        expect(checkCollisions(shape, board)).to.eq(true, 'expected collision with right wall');
    });

    it('check collisions with other blocks', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 2, 1, 1],
            [0, 0, 2, 1, 1, 1, 1],
        ];

        const shape = createShape(T_SHAPE, 7);
        expect(checkCollisions(shape, board)).to.eq(false, 'no collisions expected');

        shape.x = 5;
        shape.y = 4;
        expect(checkCollisions(shape, board)).to.eq(true, 'collision with 7 3');

        shape.x = 4;
        shape.y = 5;
        expect(checkCollisions(shape, board)).to.eq(true, 'collision with 4 6');

        shape.x = 2;
        shape.y = 5;
        expect(checkCollisions(shape, board)).to.eq(false, 'no collisions');
    });

    it('get shape coordinates on board', () => {
        const shape = createShape(O_SHAPE, 7);
        shape.y = 2;
        const coords = getShapeCoordinatesOnBoard(shape);

        const expectedCoords = [
            [2, 1], [2, 2], [3, 1], [3, 2],
        ];

        expect(coords).to.deep.eq(expectedCoords);
    });
});
