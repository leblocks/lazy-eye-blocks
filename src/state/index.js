import { log } from '../utils';
import { BLOCKS_GAME_INITIAL } from './consts';

const defaultState = {
    // game settings
    leftEyeColor: 'rgb(255,0,0)',
    rightEyeColor: 'rgb(0,0,255)',
    gridEnabled: true,
    score: 0,
    speedLevel: 1,
    rows: 12,
    columns: 10,

    appState: null,

    gameCanvas: null,
    gameCanvasWrapper: null,
    canvasContext: null,
    xMargin: 0,
    yMargin: 0,
    gridFacetSize: 0,

    currentShape: null,
    nextShape: null,

    gameBoard: null,
    gameState: BLOCKS_GAME_INITIAL,
    shapesCount: 0,
    // number of ms between calls to game logic ticks
    gameLogicTicksInterval: 1000,
    // id as returned by requestAnimationFrame
    animationId: null,
    // id as returned by requestAnimationFrame
    gameLogicId: null,
    gameLogicTimeoutId: null,
};

const state = { ...defaultState };

// on each state change -> notify observers
const stateObservers = [];

function updateState(stateUpdates, notifyObservers) {
    // update state
    Object.assign(state, stateUpdates);
    if (notifyObservers) {
        // TODO probably better to put them in setTimeout(observer(state), 0) wrapper
        stateObservers.forEach((observer) => observer(state));
    }
    // TODO remove
    log(state);
}

/**
 * Updates state and notifies registered state observers.
 * @param {Object} stateUpdates Object containing new values that will be merged in
 * the current state.
 */
export function setState(stateUpdates) {
    updateState(stateUpdates, true);
}

/**
 * Updates state.
 * @param {Object} stateUpdates Object containing new values that will be merged in
 * the current state.
 */
export function setStateAndIgnoreObservers(stateUpdates) {
    updateState(stateUpdates, false);
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
