import { addStateObserver } from '../../state';
import { registerKeyboardEventListener } from '../utils';

import gameStateMachine from './state-manager';

/**
 * Inits game animation and logic.
 */
export default function () {
    registerKeyboardEventListener();
    addStateObserver(['gameState', 'appState'], (state) => gameStateMachine(state));
}
