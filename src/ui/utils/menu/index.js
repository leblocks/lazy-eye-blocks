export default function (children) {
    const element = document.createElement('div');
    element.classList.add('ui-menu');

    if (children) {
        children.forEach((child) => element.appendChild(child));
    }

    return element;
}
