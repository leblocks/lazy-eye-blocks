import { getState, setStateAndIgnoreObservers } from '../../../state';
import { getClassList, createElement } from '../../../web-api-polyfills';
import { calculateCanvasDimensions, createBoard, setGameBoardGridSizeAndMargins } from '../../utils';

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

    const { columns: c, rows: r } = getState();
    setStateAndIgnoreObservers({ gameBoard: createBoard(c, r) });

    const testStuff = () => {
        setTimeout(() => {
            const { columns, rows } = getState();
            setStateAndIgnoreObservers({ gameBoard: createBoard(columns, rows) });
            testStuff();
        }, 1000);
    };

    testStuff();

    return wrapper;
}
