import { getState } from '../../../state';
import { fireDown } from '../../utils';

import createActionButton from '../action-button';

const onClick = () => {
    const { currentShape, gameBoard } = getState();
    fireDown(currentShape, gameBoard);
};

export default function () {
    return createActionButton('&#8681;', onClick);
}
