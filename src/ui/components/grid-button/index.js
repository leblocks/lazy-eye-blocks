import { getState, setState, addStateObserver } from '../../../state';
import { createMenuItem } from '../../utils';

export default function () {
    const onClick = () => {
        const { gridEnabled } = getState();
        setState({ gridEnabled: !gridEnabled });
    };

    const button = createMenuItem('Enable grid', onClick);

    // handle state updates
    addStateObserver(['gridEnabled'], ({ gridEnabled }) => {
        if (button) {
            button.innerText = `${gridEnabled ? 'Disable' : 'Enable'} grid`;
        }
    });

    return button;
}
