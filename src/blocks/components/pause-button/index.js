import { addStateObserver, getState } from '../../../state';
import { BLOCKS_GAME_PAUSE, BLOCKS_GAME_INITIAL, BLOCKS_GAME_PLAYING } from '../../../state/consts';
import { toggleGamePause } from '../../utils';
import createActionButton from '../action-button';

const getButtonTitle = (gameState) => {
    switch (gameState) {
    case BLOCKS_GAME_PLAYING:
        return 'pause';
    case BLOCKS_GAME_INITIAL:
    case BLOCKS_GAME_PAUSE:
        return 'play';
    default:
            // do nothing
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
