import {
    BASE_DESCENT_RATE,
    DECENT_RATE_DECREMENT_STEP,
    MINIMUM_DESCENT_RATE,
} from '../../config';

import {
    BLOCKS_GAME_PAUSE,
    BLOCKS_GAME_PLAYING,
} from '../../state/consts';

import {
    getState,
    setState,
} from '../../state';

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
export const getSpeedLevel = (clearedLinesCount) => Math.floor(Math.sqrt(clearedLinesCount));


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
