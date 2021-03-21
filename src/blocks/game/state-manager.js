import { initGameStats, stopGameTicks } from '../utils';

import {
    requestAnimationFrame,
} from '../../web-api-polyfills';

import draw from './draw';
import logic from './logic';

import {
    BLOCKS_GAME_PAUSE,
    BLOCKS_GAME_PLAYING,
    BLOCKS_GAME_INITIAL,
    BLOCKS_GAME_OVER,
    GAME_OVER_STATE,
} from '../../state/consts';
import { setState } from '../../state';


/**
 * Core game state management logic.
 * @param {Object} state Current state.
 */
const gameStateMachine = (state) => {
    const {
        rows,
        columns,
        gameState,
    } = state;

    switch (gameState) {
    case BLOCKS_GAME_INITIAL:
        // initialize game
        initGameStats(columns, rows);
        break;
    case BLOCKS_GAME_PLAYING:
        // start animations and logic loops
        requestAnimationFrame(draw);
        requestAnimationFrame(logic);
        break;
    case BLOCKS_GAME_PAUSE:
        stopGameTicks();
        break;
    case BLOCKS_GAME_OVER:
        stopGameTicks();
        setState({ appState: GAME_OVER_STATE, gameState: BLOCKS_GAME_INITIAL });
        break;
    default:
        // should not be here
        throw new Error(`Unsupported game state: ${gameState}`);
    }
};

export default gameStateMachine;
