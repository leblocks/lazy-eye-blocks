import { setState } from '../state';

export default function (targetState) {
    setState({ gameState: targetState });
}
