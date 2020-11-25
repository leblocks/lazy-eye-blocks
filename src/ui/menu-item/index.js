export default function (title, onClick) {
    const element = document.createElement('button');
    element.innerText = title;
    element.onclick = onClick;
    element.classList.add('ui-menu-item');
    return element;
}
