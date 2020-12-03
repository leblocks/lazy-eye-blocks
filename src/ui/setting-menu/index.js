import { setState } from '../../state';

import { createMenu, createMenuItem, createMenuTitle } from '../components';


import { MAIN_MENU_STATE } from '../../state/consts';


const createGridButton = () => {
    const button = createMenuItem('Enable Grid', () => {});
    return button;
};

/**
 * Creates and configures settings menu.
 */
export default function () {
    const title = createMenuTitle('Settings');

    const gridButton = createGridButton();
    const difficultyButton = createMenuItem('Level of difficulty', () => {});
    const leftEyeColor = createMenuItem('Left eye color', () => {});
    const rightEyeColor = createMenuItem('Right eye color', () => {});
    const back = createMenuItem('Back', () => setState({ gameState: MAIN_MENU_STATE }));

    return createMenu([title, gridButton, difficultyButton, leftEyeColor, rightEyeColor, back]);
}
