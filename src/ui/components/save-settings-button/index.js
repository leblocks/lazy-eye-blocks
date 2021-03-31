import { LOCAL_STORAGE_SETTINGS_KEY } from '../../../config';
import { getState } from '../../../state';
import { getGameSettings } from '../../../utils';
import { saveItem } from '../../../web-api-polyfills';
import { createMenuItem } from '../../utils';

const onClick = () => {
    const settingsToSave = getGameSettings(getState());
    saveItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settingsToSave));
};

export default function () {
    return createMenuItem('Save settings', onClick);
}
