const defaultState = {
    // game settings
    leftEyeColor: 'red',
    rightEyeColor: 'blue',
    score: 0,
    shapesCount: 0,
    gridEnabled: false,
    levelOfDifficulty: 0,

    // TODO hold here game state?
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
}

export function getState() {
    return state;
}

/**
 * Resets state.
 */
export function resetState() {
    Object.assign(state, defaultState);
}

/**
 * @callback OnStateUpdateCallback
 * Callback that will be called by {@link setState} method on every state update.
 *
 * @param {Object} state Updated state.
 */

/**
 * Registers callback that will be called on each 'state' update.
 *
 * @param {OnStateUpdateCallback} callback To be notified on state updates.
 */
export function addStateObserver(callback) {
    stateObservers.push(callback);
}

/**
 * Removes all registered observers.
 */
export function removeStateObservers() {
    stateObservers.splice(0, stateObservers.length);
}
