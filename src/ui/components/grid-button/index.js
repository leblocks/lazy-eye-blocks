import { getState, setState, addStateObserver } from '../../../state';
import { createMenuItem } from '../../utils';

export default function () {
    const id = 'gridButton';

    const onClick = () => {
        const { gridEnabled } = getState();
        setState({ gridEnabled: !gridEnabled });
    };

    // handle state updates
    addStateObserver(({ gridEnabled }) => {
        const button = document.getElementById(id);
        if (button) {
            button.innerText = `${gridEnabled ? 'Disable' : 'Enable'} grid`;
        }
    });

    const button = createMenuItem('Enable grid', onClick);
    button.setAttribute('id', id);

    return button;
}
