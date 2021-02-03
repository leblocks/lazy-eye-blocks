const defaultState = {
    score: 0,
    shapesCount: 0,
    gameState: null,
    // id as returned by requestAnimationFrame
    animationId: null,
    // id as returned by requestAnimationFrame
    gameLogicId: null,
};

const state = { ...defaultState };

/**
 * Updates game state.
 * @param {Object} stateUpdates Object containing new values that will be merged in
 * the current state.
 */
export function setGameState(stateUpdates) {
    // update state
    Object.assign(state, stateUpdates);
}

export function getGameState() {
    return state;
}
