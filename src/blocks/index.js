import { cancelAnimationFrame, createElement, requestAnimationFrame } from '../web-api-polyfills';
import { addStateObserver, getState, setState } from '../state';
import { BLOCKS_STATE } from '../state/consts';
import { setCanvasDimensions, getCanvasDimensions } from './utils';
import { draw } from './draw';
import { getGameState } from './gameState';

/**
 * Inits the game itself. Setups various handlers.
 */
export default function () {
    const canvas = createElement('canvas');
    canvas.setAttribute('class', 'game-canvas');
    canvas.style.position = 'absolute';
    setCanvasDimensions(canvas, getCanvasDimensions());
    setState({ gameCanvas: canvas, gameCanvasContext: canvas.getContext('2d') });

    window.onresize = () => {
        // handle windows resize events
        const { gameCanvas } = getState();
        setCanvasDimensions(gameCanvas, getCanvasDimensions());
    };

    addStateObserver(({ gameState }) => {
        if (gameState === BLOCKS_STATE) {
            // init or restore game here
            requestAnimationFrame(draw);
        } else {
            // pause or perform cleanup here
            const { animationId } = getGameState();
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        }
    });

    return canvas;
}
