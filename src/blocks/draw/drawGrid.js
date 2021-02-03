/**
 * Draws grid on the canvas.
 * @param {*} ctx Canvas 2D context.
 * @param {*} columns Number of rows.
 * @param {*} rows  Number of columns.
 */
export default function (ctx, cols, rows, width, height) {
    // set grid color
    ctx.strokeStyle = 'white';

    // set grid width
    ctx.lineWidth = 2;

    // calculate number of rows
    const d = width / cols;

    // draw vertical lines
    for (let i = 0; i < cols; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * d, 0);
        ctx.lineTo(i * d, height);
        ctx.stroke();
    }


    // draw horizontal lines
    for (let i = height / d; i > 0; i -= 1) {
        ctx.beginPath();
        ctx.moveTo(0, i * d);
        ctx.lineTo(width, i * d);
        ctx.stroke();
    }
}
