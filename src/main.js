import './icon.ico';
import './main.scss';
import './index.html';

import { createMenu, createMenuItem, createMenuTitle } from './ui';

window.onload = () => {
    const menu = createMenu();
    menu.appendChild(createMenuTitle('Main menu'));
    for (let i = 1; i < 5; i += 1) {
        const mi = createMenuItem(`Menu Item ${i}`, null);
        menu.appendChild(mi);
    }

    document.querySelector('.main').appendChild(menu);
};
