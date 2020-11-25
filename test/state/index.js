import { getState, setState } from '../../src/state';

// chai is loaded in test.html
const { expect } = chai;

describe('state module', () => {
    it('get default state', () => {
        const {
            score, leftEyeColor, rightEyeColor, levelOfDifficulty,
        } = getState();
        expect(score).to.eq(0);
        expect(levelOfDifficulty).to.eq(0);
        expect(leftEyeColor).to.eq('red');
        expect(rightEyeColor).to.eq('blue');
    });

    it('set state no observers', () => {
        setState({ score: 100 });
        expect(getState().score).to.eq(100);

        setState({ score: 50 });
        expect(getState().score).to.eq(50);
    });

    it('set state with observers', () => {
	// TODO implement
    });

    it('set state with observers async', () => {
	// TODO implement
    });
});
