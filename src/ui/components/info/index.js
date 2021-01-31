import { createElement } from '../../../web-api-polyfills';

/**
 * Creates info component.
 * @param {string} content Content that will be rendered in the info component.
 * @param {callback} onClose Function that will be called on close button click.
 */
export default function (content, onClose) {
    const infoContent = createElement('div');
    infoContent.classList.add('info-content');
    infoContent.innerHTML = content;

    const closeButton = createElement('button');
    closeButton.innerText = 'Back';
    closeButton.onclick = onClose;
    closeButton.classList.add('info-close-button');

    const info = createElement('div');
    info.classList.add('info');
    info.appendChild(infoContent);
    info.appendChild(closeButton);
    return info;
}
