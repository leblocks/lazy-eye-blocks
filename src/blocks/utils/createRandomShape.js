import { SHAPE_TYPES } from './consts';
import createShape from './createShape';

/**
 * Creates random shape.
 * @param {number} columCount Column count of the game border.
 */
export default function (columnCount) {
    const randomShapeType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    return createShape(randomShapeType, columnCount);
}
