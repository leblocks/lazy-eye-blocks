import { LEFT_RIGHT_DISTRIBUTION } from '../../config';
import { MODE_ALTERNATE_CELLS, MODE_ALTERNATE_SHAPES } from '../../state/consts';
import {
    SHAPE_TYPES,
    SHAPE_FORMS,
    LEFT_EYE_BOARD_CELL,
    RIGHT_EYE_BOARD_CELL,
} from './consts';


const isLeftEye = () => Math.random() < LEFT_RIGHT_DISTRIBUTION;

const initShapeColors = (coloringMode) => {
    switch (coloringMode) {
    case MODE_ALTERNATE_CELLS:
        return [1, 1, 1, 1]
            // eslint-disable-next-line no-confusing-arrow
            .map(() => isLeftEye() ? LEFT_EYE_BOARD_CELL : RIGHT_EYE_BOARD_CELL);
    case MODE_ALTERNATE_SHAPES:
        // eslint-disable-next-line no-case-declarations
        const cell = isLeftEye() ? LEFT_EYE_BOARD_CELL : RIGHT_EYE_BOARD_CELL;
        return [cell, cell, cell, cell];
    default:
        // do nothing
        throw new Error(`Unsupported coloring mode: ${coloringMode}`);
    }
};

/**
 * Creates new shape object.
 * @param {string} type String that denotes type of the shape. See SHAPE_TYPES.
 * @param {number} columCount Column count of the game border.
 * @param {string} colorinMode Defines coloring of the shapes.
 */
export const createShape = (type, columCount, coloringMode) => ({
    // type of the shape T, L ...
    type,
    // sets x - coordinate, new shape must be in the middle of the game field
    x: Math.floor(columCount / 2),
    // set y - coordinate, new shape must be out of game field
    y: -4,
    // sets basic form of the shape, new shape must not be rotated
    currentShapeFormIndex: 0,
    // possible rotations of the shape, see SHAPE_FORMS
    possibleShapeForms: [...SHAPE_FORMS[type]],

    colors: initShapeColors(coloringMode),
});

/**
 * Creates random shape.
 * @param {number} columCount Column count of the game border.
 */
export const createRandomShape = (columnCount) => {
    const randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    return createShape(randomShapeType, columnCount);
};
