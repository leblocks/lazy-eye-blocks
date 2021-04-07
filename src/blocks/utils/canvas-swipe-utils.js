import { MINIMAL_SWIPE_DISTANCE } from '../../config';

export const NONE = 'NONE';
export const SWIPE_UP = 'SWIPE_UP';
export const SWIPE_LEFT = 'SWIPE_LEFT';
export const SWIPE_RIGHT = 'SWIPE_RIGHT';
export const SWIPE_DOWN = 'SWIPE_DOWN';

const ongoingTouches = [];

/**
 * @param {Touch} touch
 */
export const addOngoingTouch = (touch) => {
    ongoingTouches.push(touch);
};

/**
 * @param {number} id Touch id.
 * @returns {Touch} Touch object with given id or -1.
 */
export const getOngoingTouch = (id) => {
    for (let i = 0; i < ongoingTouches.length; i += 1) {
        if (id === ongoingTouches[i].identifier) {
            return ongoingTouches[i];
        }
    }
    return -1;
};

export const removeOngoingTouch = (id) => {
    const touch = getOngoingTouch(id);
    const indexToRemove = ongoingTouches.indexOf(touch);
    if (indexToRemove !== -1) {
        ongoingTouches.splice(indexToRemove, 1);
    }
};

/**
 * Calculates actual action from previous and current state of a touch.
 */
export const getActionName = (currentTouch, previousTouch) => {
    // TODO add support for tap?
    // TODO add support for short\long  swipe down
    const dx = currentTouch.pageX - previousTouch.pageX;
    const dy = currentTouch.pageY - previousTouch.pageY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < MINIMAL_SWIPE_DISTANCE) {
        // do nothing
        return NONE;
    }

    if (absDx > absDy) {
        return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    }
    return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
};


/**
 * @returns {Touch[]} All ongoing touches.
 */
export const getAllOngoingTouches = () => ongoingTouches;
