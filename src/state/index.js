const defaultState = {
    leftEyeColor: 'red',
    rightEyeColor: 'blue',
    score: 0,
    levelOfDifficulty: 0,
};

const state = { ...defaultState };

// on each state change -> notify observers
const stateObservers = [];

export function setState(stateUpdates) {
    // update state
    Object.assign(state, stateUpdates);
    // notify observers
    stateObservers.forEach((observer) => observer(state));
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
