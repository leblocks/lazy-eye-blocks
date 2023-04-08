import { addStateObserver } from '../../../state';
import createStatInfo from '../stat-info';

export default function () {
    const info = createStatInfo(`level: ${0}`);
    addStateObserver(['speedLevel'], ({ speedLevel }) => {
        info.innerText = `level: ${speedLevel}`;
    });
    return info;
}
