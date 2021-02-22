import { getState, setStateAndIgnoreObservers } from '../../state';
import { BLOCKS_GAME_PLAYING } from '../../state/consts';
import { requestAnimationFrame } from '../../web-api-polyfills';
import { createRandomShape } from '../utils';

/**
 * Main game logic function.
 */
function logic() {
    const {
        columns,
        nextShape,
        currentShape,
        gameLogicTicksInterval,
    } = getState();
    // gameLogic calls itself via requestAnimationFrame AND setTimeout function
    // we need setTimeout because we need to change from time to time frequency of some
    // events that happen in game

    // we keep track of setTimeout id in order to be able to stop it afterwards
    // timeout is set to GAME.DESCENT_RATE
    const gameLogicTimeoutId = setTimeout(() => {
        // we have to check against most relevant game state value
        // that is why here is call to getState
        const { gameState } = getState();
        if (gameState !== BLOCKS_GAME_PLAYING) {
            return;
        }

        if (currentShape == null) {
            setStateAndIgnoreObservers({
                currentShape: nextShape,
                nextShape: createRandomShape(columns),
            });
        }

        // call itself recursively and update logic and timeout id
        setStateAndIgnoreObservers({
            gameLogicTimeoutId,
            gameLogicId: requestAnimationFrame(logic),
        });
    }, gameLogicTicksInterval);
}

export default logic;
