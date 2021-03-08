import { setState, addStateObserver } from '../../../state';
import { createMenuItem } from '../../utils';

import {
    BLOCKS_STATE,
    BLOCKS_GAME_PLAYING,
    BLOCKS_GAME_INITIAL,
} from '../../../state/consts';

export default function () {
    const onClick = () => {
        setState({ appState: BLOCKS_STATE, gameState: BLOCKS_GAME_PLAYING });
    };

    const button = createMenuItem('New Game', onClick);

    // handle state updates
    addStateObserver(['gameState'], ({ gameState }) => {
        if (button) {
            button.innerText = `${gameState === BLOCKS_GAME_INITIAL ? 'New' : 'Continue'} game`;
        }
    });
    return button;
}
