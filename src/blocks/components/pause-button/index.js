import { addStateObserver, getState, setState } from '../../../state';
import { BLOCKS_GAME_PAUSE, BLOCKS_GAME_PLAYING } from '../../../state/consts';
import createActionButton from '../action-button';

const onClick = () => {
    const { gameState } = getState();
    switch (gameState) {
    case BLOCKS_GAME_PAUSE:
        setState({ gameState: BLOCKS_GAME_PLAYING });
        break;
    case BLOCKS_GAME_PLAYING:
        setState({ gameState: BLOCKS_GAME_PAUSE });
        break;
    default:
        // do nothing;
    }
};

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
    const button = createActionButton(getButtonTitle(currentGameState), onClick);
    addStateObserver(['gameState'], ({ gameState }) => {
        button.innerHTML = getButtonTitle(gameState);
    });
    return button;
}
