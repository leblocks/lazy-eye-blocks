import { addStateObserver } from '../../state';

import gameStateMachine from './state-manager';

/**
 * Inits game animation and logic.
 */
export default function () {
    addStateObserver((state) => {
        gameStateMachine(state);
    });
}
