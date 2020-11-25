const state = {
    leftEyeColor: 'red',
    rightEyeColor: 'blue',
    score: 0,
    levelOfDifficulty: 0,
};

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

export function addStateObserver(callback) {
    stateObservers.push(callback);
}
