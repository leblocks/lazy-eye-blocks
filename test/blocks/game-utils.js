import {
    getGameTicksInterval,
} from '../../src/blocks/utils';

import { DECENT_RATE_DECREMENT_STEP, MINIMUM_DESCENT_RATE } from '../../src/config';

// chai is loaded in test.html
const { expect } = chai;

describe('game-utils.js tests', () => {
    it('game ticks interval is not going below minimum value', () => {
        expect(getGameTicksInterval(10000)).to.be.eq(MINIMUM_DESCENT_RATE);
    });

    it('game ticks interval is decrement by provided value', () => {
        const levelOneDecrement = getGameTicksInterval(1);
        const levelTwoDecrement = getGameTicksInterval(2);
        expect(levelOneDecrement - levelTwoDecrement).to.eq(DECENT_RATE_DECREMENT_STEP);
    });
});
