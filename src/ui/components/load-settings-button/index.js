import { LOCAL_STORAGE_SETTINGS_KEY } from '../../../config';
import { setState } from '../../../state';
import { loadItem } from '../../../web-api-polyfills';
import { createMenuItem } from '../../utils';

const onClick = () => {
    const settingsFromStorage = loadItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (settingsFromStorage != null) {
        setState({ ...JSON.parse(settingsFromStorage) });
    }
};

export default function () {
    return createMenuItem('Load settings', onClick);
}
