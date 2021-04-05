import { getState } from '../../../state';
import { moveShapeLeft } from '../../utils';
import createActionButton from '../action-button';

const onClick = () => {
    const { currentShape, gameBoard } = getState();
    moveShapeLeft(currentShape, gameBoard);
};

export default function () {
    // html entity sign for left arrow
    return createActionButton('&#8678;', onClick);
}
