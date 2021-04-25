import { getState, setState } from '../../state';
import { goto } from '../../utils';
import { createPlusMinusButton } from '../components';
import {
    createMenu,
    createMenuItem,
    createMenuItemText,
    createMenuTitle,
} from '../utils';

import { SETTINGS_MENU_STATE } from '../../state/consts';
import { resizeGameBoard } from '../../blocks/utils/board-utils';
import { MINIMUM_BOARD_COLUMNS_COUNT, MINIMUM_BOARD_ROWS_COUNT } from '../../config';

const changeBoardRowCount = (increment) => {
    const { rows, columns, gameBoard } = getState();
    if ((rows + increment) >= MINIMUM_BOARD_ROWS_COUNT) {
        setState({
            rows: rows + increment,
            gameBoard: resizeGameBoard(gameBoard, columns, rows + increment),
            // will call windos.onresize() method to adjust new grid size
            shouldCallResizeOnDraw: true,
        });
    }
};

const changeBoardColCount = (increment) => {
    const { rows, columns, gameBoard } = getState();
    if ((columns + increment) >= MINIMUM_BOARD_COLUMNS_COUNT) {
        setState({
            columns: columns + increment,
            gameBoard: resizeGameBoard(gameBoard, columns + increment, rows),
            // will call windos.onresize() method to adjust new grid size
            shouldCallResizeOnDraw: true,
        });
    }
};

export default function () {
    const rowCountControl = createPlusMinusButton(() => changeBoardRowCount(1),
        () => changeBoardRowCount(-1), (state) => state.rows);

    const colCountControl = createPlusMinusButton(() => changeBoardColCount(1),
        () => changeBoardColCount(-1), (state) => state.columns);

    return createMenu([
        createMenuTitle('Board size'),
        createMenuItemText('Rows'),
        rowCountControl,
        createMenuItemText('Columns'),
        colCountControl,
        createMenuItem('Back', () => goto(SETTINGS_MENU_STATE)),
    ]);
}
