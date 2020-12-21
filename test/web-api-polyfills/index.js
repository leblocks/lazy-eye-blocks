import { requestAnimationFrame } from '../../src/web-api-polyfills';

const { expect } = chai;

describe('Utils module', () => {
    // TODO more meaningful tests
    it('requestAnimationFrame', () => {
        let counter = 0;
        requestAnimationFrame(() => {
            counter += 1;
        });
        expect(counter).to.eq(1);
    });
});
