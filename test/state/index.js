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
        removeStateObservers();
    });

    beforeEach(() => {
        resetState();
    });

    it('get default state', () => {
        const {
            score,
            leftEyeColor,
            rightEyeColor,
            speedLevel,
        } = getState();

        expect(score).to.eq(0);
        expect(speedLevel).to.eq(1);
        expect(leftEyeColor).to.eq('rgb(255,0,0)');
        expect(rightEyeColor).to.eq('rgb(0,0,255)');
    });

    it('remove state observer', () => {
        const throwingObserver = () => {
            throw new Error('should not happen');
        };

        addStateObserver(throwingObserver);
        removeStateObservers();

        expect(() => setState({ score: 1 })).to.not.throw();
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
            speedLevel,
            leftEyeColor,
            rightEyeColor,
        } = getState();

        expect(score).to.eq(0);
        expect(speedLevel).to.eq(1);
        expect(leftEyeColor).to.eq('rgb(255,0,0)');
        expect(rightEyeColor).to.eq('rgb(0,0,255)');
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
        // this observer will be invoked by setState function
        addStateObserver(({ score }) => {
            expect(score).to.eq(234);
            done();
        });

        // update state in an async way
        setTimeout(() => setState({ score: 234 }), 50);
    });
});
