import { getState, setState, addStateObserver } from '../../../state';
import { MODE_ALTERNATE_CELLS, MODE_ALTERNATE_SHAPES } from '../../../state/consts';
import { createMenuItem } from '../../utils';

const modes = [MODE_ALTERNATE_CELLS, MODE_ALTERNATE_SHAPES];

const getButtonTitle = (coloringMode) => {
    let title;
    switch (coloringMode) {
    case MODE_ALTERNATE_SHAPES:
        title = 'shapes';
        break;
    case MODE_ALTERNATE_CELLS:
        title = 'cells';
        break;
    default:
        // do nothing
    }
    return `Coloring by ${title}`;
};

const onClick = () => {
    const { coloringMode } = getState();
    const currentMode = modes.indexOf(coloringMode);
    setState({ coloringMode: modes[(currentMode + 1) % modes.length] });
};

export default function () {
    const { coloringMode: currentColoringMode } = getState();

    const button = createMenuItem(getButtonTitle(currentColoringMode), onClick);

    // handle state updates
    addStateObserver(['coloringMode'], ({ coloringMode }) => {
        if (button) {
            button.innerText = getButtonTitle(coloringMode);
        }
    });
    return button;
}
