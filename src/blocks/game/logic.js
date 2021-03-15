import { TETRIS_BONUS } from '../../config';
import { getState, setState, setStateSilently } from '../../state';
import { BLOCKS_GAME_PLAYING } from '../../state/consts';
import { requestAnimationFrame } from '../../web-api-polyfills';

import {
    clearBoard,
    checkCollisions,
    createRandomShape,
    getShapeCoordinatesOnBoard,
} from '../utils';

import { RIGHT_EYE_BOARD_CELL } from '../utils/consts';

/**
 * Main game logic function.
 */
function logic() {
    const {
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
        const {
            score,
            columns,
            gameState,
            gameBoard,
            nextShape,
            currentShape,
            linesCleared,
        } = getState();

        if (gameState !== BLOCKS_GAME_PLAYING) {
            return;
        }

        // try to move currentShape one cell down
        currentShape.y += 1;
        if (checkCollisions(currentShape, gameBoard)) {
            // if shape collided we have to restore previous coords
            // and put it on a game board
            currentShape.y -= 1;
            getShapeCoordinatesOnBoard(currentShape)
                .forEach(([x, y]) => {
                    // on board array y is for rows and x is for columns
                    gameBoard[y][x] = RIGHT_EYE_BOARD_CELL;
                });


            // clear lines if needed
            const linesClearedInACurrentTick = clearBoard(gameBoard);
            if (linesClearedInACurrentTick > 0) {
                // check total lines cleared -> adjust speedLevel
                const newScore = score + ((linesClearedInACurrentTick === 4)
                    ? TETRIS_BONUS : linesClearedInACurrentTick);

                const totalClearedLines = linesCleared + linesClearedInACurrentTick;

                setStateSilently({
                    // update speed level also
                    linesCleared: totalClearedLines,
                });

                // notify score observer
                setState({ score: newScore });
            }


            // spawn new shape
            setStateSilently({
                currentShape: nextShape,
                nextShape: createRandomShape(columns),
            });
        }
        // call itself recursively and update logic and timeout id
        setStateSilently({
            gameLogicTimeoutId,
            gameLogicId: requestAnimationFrame(logic),
        });
    }, gameLogicTicksInterval);
}

export default logic;
