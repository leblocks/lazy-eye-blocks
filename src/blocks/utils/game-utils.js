import {
    BASE_DESCENT_RATE,
    DECENT_RATE_DECREMENT_STEP,
    MINIMUM_DESCENT_RATE,
} from '../../config';

import {
    MAIN_MENU_STATE,
    BLOCKS_GAME_INITIAL,
    BLOCKS_GAME_PAUSE,
    BLOCKS_GAME_PLAYING,
} from '../../state/consts';

import {
    getState,
    setState,
    setStateSilently,
} from '../../state';

import { createEmptyBoard } from './board-utils';
import { createRandomShape } from './shape-creation-utils';

/**
 * Calculates interval duration between game ticks.
 *
 * @param {number} speedLevel Game speed level.
 */
export const getGameTicksInterval = (speedLevel) => {
    const newDescentRate = BASE_DESCENT_RATE - speedLevel * DECENT_RATE_DECREMENT_STEP;
    if (newDescentRate < MINIMUM_DESCENT_RATE) {
        return MINIMUM_DESCENT_RATE;
    }
    return newDescentRate;
};

/**
 * Calcualtes correct speed level from provided total count of cleared lines.
 *
 * @param {number} clearedLinesCount Number of cleared lines.
 * @return {number} Level of difficulty.
 */
export const getSpeedLevel = (clearedLinesCount) => Math.floor(Math.sqrt(clearedLinesCount)) + 1;


/**
 * Calcualtes correct number of lines to clear from provided speed level.
 *
 * @param {number} speedLevel Level of difficulty.
 * @return {number} Number of lines needed to clear for given speed level.
 */
export const getNumberOfLinesNeeded = (speedLevel) => speedLevel * speedLevel;


/**
 * Pauses or resumes game, depending on currnet game state.
 */
export const toggleGamePause = () => {
    const { gameState } = getState();
    switch (gameState) {
    case BLOCKS_GAME_INITIAL:
    case BLOCKS_GAME_PAUSE:
        setState({ gameState: BLOCKS_GAME_PLAYING });
        break;
    case BLOCKS_GAME_PLAYING:
        setState({ gameState: BLOCKS_GAME_PAUSE });
        break;
    default:
        // do nothing;
    }
};

/**
 * Stops game logic and draw loops.
 */
export const stopGameTicks = () => {
    const {
        animationId,
        gameLogicId,
        gameLogicTimeoutId,
    } = getState();

    cancelAnimationFrame(animationId);
    cancelAnimationFrame(gameLogicId);
    clearInterval(gameLogicTimeoutId);

    setStateSilently({
        animationId: null,
        gameLogicId: null,
        gameLogicTimeoutId: null,
    });
};

/**
 * Sets initial stats for a new game.
 */
export const initGameStats = () => {
    const { columns, rows, coloringMode } = getState();

    setStateSilently({
        score: 0,
        linesCleared: 0,
        nextShape: createRandomShape(columns, coloringMode),
        currentShape: createRandomShape(columns, coloringMode),
        gameBoard: createEmptyBoard(columns, rows),
    });
};


/**
 * Resets game and sets state to show main menu.
 */
export const resetGame = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const ok = confirm('Do you want to reset game?');
    if (ok) {
        stopGameTicks();
        initGameStats();
        setState({ appState: MAIN_MENU_STATE, gameState: BLOCKS_GAME_INITIAL });
    }
};
