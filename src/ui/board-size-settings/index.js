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

const changeBoardRowCount = (increment) => {
    const { rows } = getState();
    if ((rows + increment) >= 12) {
        setState({ rows: rows + increment });
    }
};

const changeBoardColCount = (increment) => {
    const { columns } = getState();
    if ((columns + increment) >= 10) {
        setState({ columns: columns + increment });
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
