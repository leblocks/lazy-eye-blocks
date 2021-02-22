import { getState } from '../../../state';
import { rotateShape } from '../../utils';

import createActionButton from '../action-button';

const onClick = () => {
    const { currentShape, gameBoard } = getState();
    rotateShape(currentShape, gameBoard);
};

export default function () {
    // rotation html entity
    return createActionButton('&#8635;', onClick);
}
