import { setState } from '../state';

/**
 * Changes game state.
 * @param {string} targetState State to change to.
 */
export default function (targetState) {
    setState({ gameState: targetState });
}
