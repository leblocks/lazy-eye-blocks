import {
    setState,
    getState,
    resetState,
    setStateSilently,
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
            leftEyeColor,
            rightEyeColor,
            speedLevel,
        } = getState();

        expect(speedLevel).to.eq(0);
        expect(leftEyeColor).to.eq('rgb(255,0,0)');
        expect(rightEyeColor).to.eq('rgb(0,0,255)');
    });

    it('remove state observer', () => {
        const throwingObserver = () => {
            throw new Error('should not happen');
        };

        addStateObserver([], throwingObserver);
        removeStateObservers();

        expect(() => setState({ score: 1 })).to.not.throw();
    });

    it('state reset', () => {
        setState({
            levelOfDifficulty: 146,
            leftEyeColor: 'sugoi',
            rightEyeColor: 'weird',
        });

        resetState();

        const {
            speedLevel,
            leftEyeColor,
            rightEyeColor,
        } = getState();

        expect(speedLevel).to.eq(0);
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
        const observer = { callCount: 0 };
        // disabled for this case of the unit test
        // eslint-disable-next-line no-unused-vars
        addStateObserver(['score'], (state) => { observer.callCount += 1; });
        expect(observer.callCount).to.eq(0);
        setState({ score: 99 });
        expect(observer.callCount).to.eq(1);
    });

    it('set state with observers listening on different property', () => {
        const observer = { callCount: 0 };
        // register observer on 'score' property
        // disabled for this case of the unit test
        // eslint-disable-next-line no-unused-vars
        addStateObserver(['score'], ({ score }) => { observer.callCount += 1; });
        setState({ speedLevel: 10 });
        // assert that observer were not called
        expect(observer.callCount).to.eq(0);
    });

    it('set state with observers on 2 properties', () => {
        const observer = { callCount: 0 };
        // register observer on 'score' and 'speedLevel' property
        // disabled for this case of the unit test
        // eslint-disable-next-line no-unused-vars
        addStateObserver(['score', 'speedLevel'], ({ score }) => { observer.callCount += 1; });
        setState({ speedLevel: 10 }); // should notify
        setState({ score: 122 }); // should notify
        setState({ leftEyeColor: 'red' }); // must not notify
        expect(observer.callCount).to.eq(2);
    });


    it('set state and don\'t notify observers', () => {
        const observer = { callCount: 0 };
        // register observer on 'score' property
        // disabled for this case of the unit test
        // eslint-disable-next-line no-unused-vars
        addStateObserver(['score'], ({ score }) => { observer.callCount += 1; });
        expect(observer.callCount).to.eq(0);
        setStateSilently({ score: 99 });
        expect(observer.callCount).to.eq(0);
    });

    it('set state with observers async', (done) => {
        // this observer will be invoked by setState function
        addStateObserver(['score'], ({ score }) => {
            expect(score).to.eq(234);
            done();
        });

        // update state in an async way
        setTimeout(() => setState({ score: 234 }), 50);
    });

    it('add observer on wrong property', () => {
        const mustThrow = () => {
            addStateObserver(['non_existing_property'], () => 'dumb string');
        };
        expect(mustThrow).to.throw('non_existing_property is not key in the state.');
    });
});
