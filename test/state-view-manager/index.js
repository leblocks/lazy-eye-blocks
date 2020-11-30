
// import { initStateViewManager } from '../../src/ui';
import { getMainContainer } from '../../src/utils';


const { expect } = chai;

describe('State view manager', () => {
    before('init main container to test page', () => {
        const main = document.createElement('div');
        main.classList.add('main');
        document.body.appendChild(main);
    });

    it('Main container exists', () => {
        expect(getMainContainer()).to.not.equal(null);
    });

    // TODO finish other tests

    after('remove main container', () => {
        getMainContainer().remove();
    });
});
