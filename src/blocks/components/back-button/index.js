import { setState } from '../../../state';
import { BLOCKS_GAME_PAUSE, MAIN_MENU_STATE } from '../../../state/consts';
import createActionButton from '../action-button';

const onClick = () => {
    setState({
        appState: MAIN_MENU_STATE,
        gameState: BLOCKS_GAME_PAUSE,
    });
};

export default function () {
    return createActionButton('Back', onClick);
}
