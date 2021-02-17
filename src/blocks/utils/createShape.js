import { SHAPE_FORMS } from './consts';
/**
 * Creates new shape object.
 * @param {string} type String that denotes type of the shape. See SHAPE_TYPES.
 * @param {number} columCount Column count of the game border.
 */
export default function (type, columCount) {
    return {
        // type of the shape T, L ...
        type,
        // sets x - coordinate, new shape must be in the middle of the game field
        x: Math.floor(columCount / 2),
        // set y - coordinate, new shape must be at the top of game field
        y: 2,
        // sets basic form of the shape, new shape must not be rotated
        currentShapeFormIndex: 0,
        // possible rotations of the shape, see SHAPE_FORMS
        possibleShapeForms: [...SHAPE_FORMS[type]],
    };
}
