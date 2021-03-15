import { BASE_DESCENT_RATE, DECENT_RATE_DECREMENT_STEP, MINIMUM_DESCENT_RATE } from '../../config';

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
