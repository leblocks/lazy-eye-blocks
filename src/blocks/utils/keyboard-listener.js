import { getState, setState } from '../../state';
import { BLOCKS_GAME_PLAYING, BLOCKS_STATE } from '../../state/consts';
import { resetGame, toggleGamePause } from './game-utils';
import {
    fireDown,
    rotateShape,
    moveShapeDown,
    moveShapeLeft,
    moveShapeRight,
} from './shape-movement-utils';

// keycodes
const SPACE_KEY_CODE = 32;

const LEFT_KEY_CODE = 37;
const UP_KEY_CODE = 38;
const RIGHT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;

const G_KEY_CODE = 71;
const H_KEY_CODE = 72;
const J_KEY_CODE = 74;
const K_KEY_CODE = 75;
const L_KEY_CODE = 76;
const Q_KEY_CODE = 81;
const P_KEY_CODE = 80;

const ESC_BUTTON_KEY_CODE = 27;
const PAUSE_BUTTON_KEY_CODE = 19;

const keyboardEventListener = (e) => {
    const {
        appState,
        gameState,
        gameBoard,
        gridEnabled,
        currentShape,
    } = getState();

    // pressed key code
    const { keyCode } = e;

    // TODO refactor
    // keys allowed in any state
    switch (keyCode) {
    case P_KEY_CODE:
    case PAUSE_BUTTON_KEY_CODE:
        toggleGamePause();
        break;
    case G_KEY_CODE:
        setState({ gridEnabled: !gridEnabled });
        break;
    case ESC_BUTTON_KEY_CODE:
    case Q_KEY_CODE:
        resetGame();
        break;
    default:
        // do nothing
    }

    if (appState !== BLOCKS_STATE || gameState !== BLOCKS_GAME_PLAYING) {
        // nothing to do here
        return;
    }

    // keys allowed only in playing state
    switch (keyCode) {
    case LEFT_KEY_CODE:
    case H_KEY_CODE:
        moveShapeLeft(currentShape, gameBoard);
        break;
    case RIGHT_KEY_CODE:
    case L_KEY_CODE:
        moveShapeRight(currentShape, gameBoard);
        break;
    case UP_KEY_CODE:
    case K_KEY_CODE:
        rotateShape(currentShape, gameBoard);
        break;
    case DOWN_KEY_CODE:
    case J_KEY_CODE:
        moveShapeDown(currentShape, gameBoard);
        break;
    case SPACE_KEY_CODE:
        fireDown(currentShape, gameBoard);
        break;
    default:
        // do nothing
    }
};

/**
 * Installs keyboard controls. Should be called once.
 */
export default function () {
    document.addEventListener('keydown', keyboardEventListener, false);
}
