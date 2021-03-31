import {
    saveItem,
    loadItem,
    cancelAnimationFrame,
    requestAnimationFrame,
} from '../../src/web-api-polyfills';

// chai is loaded in test.html
const { expect } = chai;

const ITEM_KEY = 'key';

describe('web-api-polyfills test', () => {
    afterEach(() => {
        // clear local storage after each test
        window.localStorage.removeItem(ITEM_KEY);
    });

    it('requestAnimationFrame', (done) => {
        requestAnimationFrame(() => {
            done();
        });
    });

    it('cancelAnimationFrame', (done) => {
        let counter = 0;
        // schedule an update
        const animationId = requestAnimationFrame(() => {
            counter += 1;
        });
        // cancel scheduled update
        cancelAnimationFrame(animationId);
        // assert in next update that counter is still 0
        requestAnimationFrame(() => {
            expect(counter).to.eq(0);
            done();
        });
    });

    it('save/load item from local storage', () => {
        const itemToSave = { test: 'save me!' };
        saveItem(ITEM_KEY, JSON.stringify(itemToSave));

        const fromLocalStorage = JSON.parse(loadItem(ITEM_KEY));
        expect(fromLocalStorage).to.deep.eq(itemToSave);
    });
});
