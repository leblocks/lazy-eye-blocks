import createActionButton from '../action-button';

import { getState } from '../../../state';
import { moveShapeRight } from '../../utils';

const onClick = () => {
    const { currentShape, gameBoard } = getState();
    moveShapeRight(currentShape, gameBoard);
};

export default function () {
    // html entity sign for right arrow
    return createActionButton('&#8680;', onClick);
}
