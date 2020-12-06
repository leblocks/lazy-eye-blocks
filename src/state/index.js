import { log } from '../utils';

const defaultState = {
    // game settings
    leftEyeColor: 'red',
    rightEyeColor: 'blue',
    score: 0,
    shapesCount: 0,
    gridEnabled: false,
    speedLevel: 0,

    gameState: null,
};

const state = { ...defaultState };

// on each state change -> notify observers
const stateObservers = [];

/**
 * Updates state and notifies registered state observers.
 *
 * @param {Object} stateUpdates Object containing new values that will be merged in
 * the current state.
 */
export function setState(stateUpdates) {
    // update state
    Object.assign(state, stateUpdates);
    // notify observers
    stateObservers.forEach((observer) => observer(state));
    // TODO remove
    log(state);
}

export function getState() {
    return state;
}

export function resetState() {
    Object.assign(state, defaultState);
}

export function addStateObserver(callback) {
    stateObservers.push(callback);
}

export function removeStateObservers() {
    stateObservers.splice(0, stateObservers.length);
}
