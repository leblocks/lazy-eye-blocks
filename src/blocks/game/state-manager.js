import { setStateAndIgnoreObservers } from '../../state';

import {
    cancelAnimationFrame,
    requestAnimationFrame,
} from '../../web-api-polyfills';

import draw from './draw';

import {
    BLOCKS_STATE,
    BLOCKS_GAME_PAUSE,
    BLOCKS_GAME_PLAYING,
} from '../../state/consts';

const gameStateMachine = (state) => {
    const { appState, gameState, animationId } = state;

    if (appState !== BLOCKS_STATE) {
        // we don't care about blocks outside of the game
        // clear animations also
        cancelAnimationFrame(animationId);
        setStateAndIgnoreObservers({ animationId: null });
        return;
    }

    switch (gameState) {
    case BLOCKS_GAME_PLAYING:
        if (animationId === null) {
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

export default gameStateMachine;
