import { addStateObserver, setStateAndIgnoreObservers } from '../../state';
import { BLOCKS_GAME_PAUSE, BLOCKS_GAME_PLAYING } from '../../state/consts';
import { cancelAnimationFrame, requestAnimationFrame } from '../../web-api-polyfills';

import draw from './draw';

export const gameStateMachine = (state) => {
    const { gameState, animationId } = state;
    switch (gameState) {
    case BLOCKS_GAME_PLAYING:
        // TODO check that loop is not running already
        if (animationId !== null) {
            requestAnimationFrame(draw);
        }
        break;
    case BLOCKS_GAME_PAUSE:
        cancelAnimationFrame(animationId);
        setStateAndIgnoreObservers({ animationId: null });
        break;
    default:
        // should not be here
        throw new Error(`Unsupported game state: ${gameState}`);
    }
};

/**
 * Inits game animation and logic.
 */
export const initGame = () => {
    addStateObserver((state) => {
        gameStateMachine(state);
    });
};
