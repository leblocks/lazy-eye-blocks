import { addStateObserver } from '../../../state';

const repaint = (color, id) => {
    const canvas = document.getElementById(id);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

export default function (id, colorExtractor) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('color-indicator');
    canvas.setAttribute('id', id);

    addStateObserver((state) => {
        const color = colorExtractor(state);
        repaint(color, id);
    });

    return canvas;
}
