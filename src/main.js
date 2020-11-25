import './icon.ico';
import './main.scss';
import './index.html';

import { createMenu, createMenuItem } from './ui';

window.onload = () => {
    const menu = createMenu();
    for (let i = 1; i < 5; i += 1) {
        const mi = createMenuItem(`Menu Item ${i}`, null);
        menu.appendChild(mi);
    }

    document.querySelector('.main').appendChild(menu);
};
