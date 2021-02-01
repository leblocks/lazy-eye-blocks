import { getState } from '../../state';

/**
 * Calculates canvas dimensions 'width' and 'height' and its margins 'marginLeft',
 * 'marginTop' to center it on the page.
 */
export default function () {
    // factor for width and height calculation
    const factor = 0.95;
    // get inner size of browser window
    const actualHeight = Math.min(window.innerHeight, window.outerHeight);
    const actualWidth = Math.min(window.innerWidth, window.outerWidth);
    const { columns, rows } = getState();

    // calculate width from the assumptions that we want to take 95%
    // height of the screen
    let height = actualHeight * factor;
    let width = height * (columns / rows);

    if (width > actualWidth) {
        // if calculated width bigger than innerWidth
        // we have to recalculate to width and height to be able to fit it in the screen
        width = actualWidth * factor;
        height = width * (rows / columns);
    }

    // calculate margins to center canvas on a page
    const marginTop = (actualHeight - height) / 2;
    const marginLeft = (actualWidth - width) / 2;

    return {
        height,
        width,
        marginTop,
        marginLeft,
    };
}
