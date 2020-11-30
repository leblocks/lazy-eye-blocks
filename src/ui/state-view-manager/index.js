import { addStateObserver, setState } from '../../state';
import { getMainContainer } from '../../utils';

const stateViewMap = {
    currentState: null,
    map: {},
};


/**
 * Binds currect view that is mounted under main div to the current state;
 */
export default function initViewStateManager(initialState, initialMap) {
    Object.assign(stateViewMap.map, initialMap);

    const onStateChange = ({ gameState }) => {
        if (gameState !== stateViewMap.currentState) {
            const mainContainer = getMainContainer();
            mainContainer.innerHTML = '';
            mainContainer.appendChild(stateViewMap.map[gameState]);
            stateViewMap.currentState = gameState;
        }
    };
    addStateObserver(onStateChange);
    setState({ gameState: initialState });
}
