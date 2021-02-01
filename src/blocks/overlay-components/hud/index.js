import { createElement } from '../../../web-api-polyfills';
import { getCanvasDimensions } from '../../utils';

/**
 * Creates HUD transparent display with convenient buttons for a player.
 */
export default function () {
    const {
        width,
        height,
        marginTop,
        marginLeft,
    } = getCanvasDimensions();

    const element = createElement('div');
    element.setAttribute('class', 'hud-panel');
    element.setAttribute('height', 0.2 * height);
    element.setAttribute('width', width);
    element.style.position = 'absolute';
    element.style.top = `${marginTop}px`;
    element.style.left = `${marginLeft}px`;
    return element;
}
