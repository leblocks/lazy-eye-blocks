import { initStateViewManager } from '../../src/ui';
import { getMainContainer } from '../../src/utils';
import { MAIN_MENU_STATE, SETTINGS_MENU_STATE } from '../../src/state/consts';
import { getState, setState } from '../../src/state';
import { createElement, getClassList } from '../../src/web-api-polyfills';

const { expect } = chai;

describe('State view manager', () => {
    before('init main container to test page', () => {
        const main = createElement('div');
        getClassList(main).add('main');
        main.setAttribute('id', 'root');
        document.body.appendChild(main);
    });

    it('Main container exists', () => {
        expect(getMainContainer()).to.not.equal(null);
    });

    it('Check state change reflect in component reload', () => {
        const mainContainer = getMainContainer();

        // before stateViewManager init it must be empty
        expect(mainContainer.childElementCount).to.eq(0);

        const comp1 = createElement('div');
        comp1.innerText = 'comp1';

        const comp2 = createElement('div');
        comp2.innerText = 'comp2';

        const stateMap = {
            [MAIN_MENU_STATE]: comp1,
            [SETTINGS_MENU_STATE]: comp2,
        };

        initStateViewManager(SETTINGS_MENU_STATE, stateMap);

        // check initial state params
        expect(getState().appState).to.eq(SETTINGS_MENU_STATE);
        expect(mainContainer.childElementCount).to.eq(1);
        expect(mainContainer.querySelector('div').innerText).to.eq('comp2');

        setState({ appState: MAIN_MENU_STATE });
        expect(mainContainer.childElementCount).to.eq(1);
        expect(mainContainer.querySelector('div').innerText).to.eq('comp1');
    });

    after('remove main container', () => {
        getMainContainer().remove();
    });
});
