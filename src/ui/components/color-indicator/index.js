import { addStateObserver } from '../../../state';
import { createElement, getClassList } from '../../../web-api-polyfills';

export default function (colorExtractor) {
    const canvas = createElement('canvas');
    getClassList(canvas).add('color-indicator');
    // bind to state changes
    addStateObserver((state) => {
        if (canvas) {
            const color = colorExtractor(state);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
    return canvas;
}
