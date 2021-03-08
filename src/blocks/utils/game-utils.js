import { BASE_DESCENT_RATE, DECENT_RATE_DECREMENT_STEP } from '../../config';

/**
 * Calculates interval duration between game ticks.
 *
 * @param {number} speedLevel Game speed level.
 */
// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const getGameTicksInterval = (speedLevel) => {
    // TODO tests
    // TODO some speed limits
    return BASE_DESCENT_RATE - speedLevel * DECENT_RATE_DECREMENT_STEP;
};
