import {
    addOngoingTouch,
    getOngoingTouch,
    removeOngoingTouch,
    getAllOngoingTouches,
    getActionName,
    SWIPE_UP,
    NONE,
    SWIPE_DOWN,
    SWIPE_LEFT,
    SWIPE_RIGHT,
} from '../../src/blocks/utils';
import { MINIMAL_SWIPE_DISTANCE } from '../../src/config';

// chai is loaded in test.html
const { expect } = chai;


const createDummyTouch = (pageX, pageY) => ({ pageX, pageY });

const createDummyTouches = (n) => {
    const touches = [];
    for (let i = 0; i < n; i += 1) {
        touches.push({
            clientX: 243,
            clientY: 284.6000061035156,
            identifier: i,
            pageX: 243,
            pageY: 284.6000061035156,
        });
    }
    return touches;
};

describe('canvas-swipe-support.js tests', () => {
    // clean touches after each test
    afterEach(() => getAllOngoingTouches().splice(0));

    it('addOngoingTouches', () => {
        createDummyTouches(3).forEach(addOngoingTouch);
        const allTouches = getAllOngoingTouches();
        expect(allTouches.length).to.eq(3);
    });

    it('getOngoingTouch', () => {
        createDummyTouches(3).forEach(addOngoingTouch);
        expect(getOngoingTouch(0).identifier).to.eq(0);
        expect(getOngoingTouch(1).identifier).to.eq(1);
        expect(getOngoingTouch(2).identifier).to.eq(2);
    });

    it('removeOngoingTouch', () => {
        createDummyTouches(3).forEach(addOngoingTouch);
        removeOngoingTouch(1);

        expect(getOngoingTouch(0).identifier).to.eq(0);
        expect(getOngoingTouch(1)).to.eq(-1);
        expect(getOngoingTouch(2).identifier).to.eq(2);
    });

    it('getActionName none', () => {
        let previousTouch = createDummyTouch(100, 50);
        let currentTouch = createDummyTouch(100, 50 - (MINIMAL_SWIPE_DISTANCE - 1));
        expect(getActionName(currentTouch, previousTouch)).to.eq(NONE);

        previousTouch = createDummyTouch(100, 50);
        currentTouch = createDummyTouch(100, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(NONE);

        previousTouch = createDummyTouch(100, 50);
        currentTouch = createDummyTouch(100 - (MINIMAL_SWIPE_DISTANCE - 1),
            50 - (MINIMAL_SWIPE_DISTANCE - 1));
        expect(getActionName(currentTouch, previousTouch)).to.eq(NONE);
    });

    it('getActionName swipe-up', () => {
        let previousTouch = createDummyTouch(100, 70);
        let currentTouch = createDummyTouch(100, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_UP);

        previousTouch = createDummyTouch(100, 50);
        currentTouch = createDummyTouch(80, 25);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_UP);
    });

    it('getActionName swipe-down', () => {
        let previousTouch = createDummyTouch(100, 50);
        let currentTouch = createDummyTouch(100, 70);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_DOWN);

        previousTouch = createDummyTouch(100, 25);
        currentTouch = createDummyTouch(80, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_DOWN);
    });

    it('getActionName swipe-left', () => {
        let previousTouch = createDummyTouch(100, 50);
        let currentTouch = createDummyTouch(50, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_LEFT);

        previousTouch = createDummyTouch(100, 40);
        currentTouch = createDummyTouch(80, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_LEFT);
    });

    it('getActionName swipe-right', () => {
        let previousTouch = createDummyTouch(50, 50);
        let currentTouch = createDummyTouch(100, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_RIGHT);

        previousTouch = createDummyTouch(80, 40);
        currentTouch = createDummyTouch(100, 50);
        expect(getActionName(currentTouch, previousTouch)).to.eq(SWIPE_RIGHT);
    });
});
