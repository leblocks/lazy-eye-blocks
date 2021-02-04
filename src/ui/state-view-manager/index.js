import { addStateObserver, setState } from '../../state';
import { getMainContainer } from '../../utils';

const stateViewMap = {
    currentState: null, // holds name of the current state
    map: {}, // map of state names to html elements
};

/**
 * Updates children of main container according to state changes. On state change
 * element associated with old state will be unmounted and element associated with new state
 * will be mounted under root div element.
 * @param {string} initialState String with initial state name.
 * @param {Object} initialMap Map of state names to HTMLElements.
 */
export default function initViewStateManager(initialState, initialMap) {
    // init map from closure with user provided value
    Object.assign(stateViewMap.map, initialMap);

    const onStateChange = ({ appState }) => {
        if (appState !== stateViewMap.currentState) {
            const mainContainer = getMainContainer();
            mainContainer.innerHTML = '';
            mainContainer.appendChild(stateViewMap.map[appState]);
            stateViewMap.currentState = appState;
        }
    };

    // register as state observer
    addStateObserver(onStateChange);
    // init first state change and component mount
    setState({ appState: initialState });
}
