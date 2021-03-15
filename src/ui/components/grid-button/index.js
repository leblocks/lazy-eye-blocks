import { getState, setState, addStateObserver } from '../../../state';
import { createMenuItem } from '../../utils';

const getButtonTitle = (gridEnabled) => `${gridEnabled ? 'Disable' : 'Enable'} grid`;

export default function () {
    const currentButtonTitle = getButtonTitle(getState().gridEnabled);

    const onClick = () => {
        const { gridEnabled } = getState();
        setState({ gridEnabled: !gridEnabled });
    };

    const button = createMenuItem(currentButtonTitle, onClick);

    // handle state updates
    addStateObserver(['gridEnabled'], ({ gridEnabled }) => {
        if (button) {
            button.innerText = getButtonTitle(gridEnabled);
        }
    });

    return button;
}
