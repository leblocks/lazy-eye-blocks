// see https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
import {
    getActionName,
    getOngoingTouch,
    addOngoingTouch,
    removeOngoingTouch,
    SWIPE_UP,
    SWIPE_DOWN,
    SWIPE_LEFT,
    SWIPE_RIGHT,
} from './canvas-swipe-utils';

import {
    fireDown,
    moveShapeLeft,
    moveShapeRight,
    rotateShape,
} from './shape-movement-utils';

import { getState } from '../../state';

const gameActionHelper = (callback) => {
    const { currentShape, gameBoard } = getState();
    callback(currentShape, gameBoard);
};

const actionMap = {
    [SWIPE_UP]: () => gameActionHelper(rotateShape),
    [SWIPE_DOWN]: () => gameActionHelper(fireDown),
    [SWIPE_LEFT]: () => gameActionHelper(moveShapeLeft),
    [SWIPE_RIGHT]: () => gameActionHelper(moveShapeRight),
};


/**
 * Register new touches.
 * @param {TouchEvent} evt
 */
const handleTouchStart = (evt) => {
    evt.preventDefault();
    const { changedTouches } = evt;
    for (let i = 0; i < changedTouches.length; i += 1) {
        const { identifier, pageX, pageY } = changedTouches[i];
        addOngoingTouch({ pageY, pageX, identifier });
    }
};

/**
 * Remove finished touches and call corresponding method.
 * @param {TouchEvent} evt
 */
const handleTouchEnd = (evt) => {
    evt.preventDefault();
    const { changedTouches } = evt;
    for (let i = 0; i < changedTouches.length; i += 1) {
        const { identifier } = changedTouches[i];
        const touch = getOngoingTouch(identifier);
        // call appropriate action
        const actionName = getActionName(changedTouches[i], touch);
        actionMap[actionName]();
        // clean touch map
        removeOngoingTouch(identifier);
    }
};

/**
 * Remove unfinished touches.
 * @param {TouchEvent} evt
 */
const handleTouchCancel = (evt) => {
    evt.preventDefault();
    const { changedTouches } = evt;
    for (let i = 0; i < changedTouches.length; i += 1) {
        const { identifier } = changedTouches[i];
        removeOngoingTouch(identifier);
    }
};

/**
 * @param {HTMLCanvasElement} canvas A canvas that will handle swipes.
 */
// eslint-disable-next-line import/prefer-default-export
export const registerTouchEventListener = (canvas) => {
    // register event listeners on a canvas
    canvas.addEventListener('touchstart', handleTouchStart, false);
    canvas.addEventListener('touchend', handleTouchEnd, false);
    canvas.addEventListener('touchcancel', handleTouchCancel, false);
};
