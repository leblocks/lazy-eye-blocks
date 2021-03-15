import { SHAPE_TYPES, SHAPE_FORMS } from './consts';

/**
 * Creates new shape object.
 * @param {string} type String that denotes type of the shape. See SHAPE_TYPES.
 * @param {number} columCount Column count of the game border.
 */
export const createShape = (type, columCount) => ({
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
});

/**
 * Creates random shape.
 * @param {number} columCount Column count of the game border.
 */
export const createRandomShape = (columnCount) => {
    const randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    return createShape(randomShapeType, columnCount);
};
