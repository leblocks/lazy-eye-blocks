export default function (children) {
    const element = document.createElement('div');
    element.classList.add('ui-menu');

    if (children) {
        children.forEach(element.appendChild);
    }

    return element;
}
