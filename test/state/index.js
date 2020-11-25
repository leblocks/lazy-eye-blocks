import {
    setState,
    getState,
    resetState,
    addStateObserver,
    removeStateObservers,
} from '../../src/state';

// chai is loaded in test.html
const { expect } = chai;

describe('State module tests', () => {
    // cleanup state after each test
    afterEach(() => {
        resetState();
        removeStateObservers();
    });

    it('get default state', () => {
        const {
            score,
            leftEyeColor,
            rightEyeColor,
            levelOfDifficulty,
        } = getState();

        expect(score).to.eq(0);
        expect(levelOfDifficulty).to.eq(0);
        expect(leftEyeColor).to.eq('red');
        expect(rightEyeColor).to.eq('blue');
    });

    it('state reset', () => {
        setState({
            score: 12,
            levelOfDifficulty: 146,
            leftEyeColor: 'sugoi',
            rightEyeColor: 'weird',
        });

        resetState();

        const {
            score,
            levelOfDifficulty,
            leftEyeColor,
            rightEyeColor,
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
        const observer = { variable: 10 };
        addStateObserver(({ score }) => { observer.variable = score; });
        expect(observer.variable).to.eq(10);
        setState({ score: 99 });
        expect(observer.variable).to.eq(99);
    });

    it('set state with observers async', (done) => {
        const observer = { variable: 10 };
        addStateObserver(({ score }) => { observer.variable = score; });

        // update state in an async way
        setTimeout(() => {
            setState({ score: 234 });
            expect(observer.variable).to.eq(234);
            done();
        }, 100);
    });
});
