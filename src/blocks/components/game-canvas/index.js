import { setStateAndIgnoreObservers } from '../../../state';
import { getClassList, createElement } from '../../../web-api-polyfills';
import { calculateCanvasDimensions, setGameBoardGridSizeAndMargins } from '../../utils';

export default function () {
    const gameCanvas = createElement('canvas');
    getClassList(gameCanvas).add('game-canvas');

    // store canvas instance and its context in state
    setStateAndIgnoreObservers({
        gameCanvas,
        canvasContext: gameCanvas.getContext('2d'),
    });

    const wrapper = createElement('div');
    getClassList(wrapper).add('game-canvas-wrapper');
    wrapper.appendChild(gameCanvas);
    setStateAndIgnoreObservers({ gameCanvasWrapper: wrapper });

    // update canvas dimensions on each resize
    window.onresize = () => {
        calculateCanvasDimensions();
        setGameBoardGridSizeAndMargins();
    };

    return wrapper;
}
