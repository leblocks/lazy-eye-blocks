/* eslint-disable no-param-reassign */
/**
 * Sets canvas dimensions and margins.
 * @param {HTMLElement} canvas Canvas element to setup.
 * @param {Object} dimensions Object containing canvas dimensions.
 */
export default function (canvas, dimensions) {
    const {
        width,
        height,
        marginTop,
        marginLeft,
    } = dimensions;

    canvas.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.style.top = `${marginTop}px`;
    canvas.style.left = `${marginLeft}px`;
}
