import { getState, setStateAndIgnoreObservers } from '../../state';

/**
 * Setups margins and grid size according to canvas dimensions.
 */
export default function () {
    const {
        rows,
        columns,
        gameCanvas: { width, height },
    } = getState();

    const gridFacetSize = Math.min(width, height) / Math.max(columns, rows);

    const xMargin = (width - gridFacetSize * columns) / 2;
    const yMargin = (height - gridFacetSize * rows) / 2;

    setStateAndIgnoreObservers({
        yMargin,
        xMargin,
        gridFacetSize,
    });
}
