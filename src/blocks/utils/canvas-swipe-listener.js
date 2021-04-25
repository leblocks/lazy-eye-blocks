/* eslint-disable no-undef */
// hamerjs dependcy is added via cdn

import { getState } from '../../state';

import {
    fireDown,
    moveShapeLeft,
    moveShapeRight,
    rotateShape,
} from './shape-movement-utils';


const handleAction = (callback) => {
    const { gameBoard, currentShape } = getState();
    callback(currentShape, gameBoard);
};

/**
 * @param {HTMLCanvasElement} canvas A canvas that will handle swipes.
 */
// eslint-disable-next-line import/prefer-default-export
export const registerTouchEventListener = (canvas) => {
    const hammertime = new Hammer(canvas);

    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('swipeup', () => handleAction(rotateShape));
    hammertime.on('swipeleft', () => handleAction(moveShapeLeft));
    hammertime.on('swiperight', () => handleAction(moveShapeRight));
    hammertime.on('swipedown', () => handleAction(fireDown));
};
