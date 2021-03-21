import { addStateObserver, getState } from '../../../state';
import { BLOCKS_GAME_PAUSE, BLOCKS_GAME_PLAYING } from '../../../state/consts';
import { toggleGamePause } from '../../utils';
import createActionButton from '../action-button';

const getButtonTitle = (gameState) => {
    if (gameState === BLOCKS_GAME_PLAYING) {
        return 'pause';
    } if (gameState === BLOCKS_GAME_PAUSE) {
        return 'play';
    }
    return null;
};

export default function () {
    const { gameState: currentGameState } = getState();
    const button = createActionButton(getButtonTitle(currentGameState), toggleGamePause);
    addStateObserver(['gameState'], ({ gameState }) => {
        button.innerHTML = getButtonTitle(gameState);
    });
    return button;
}
