import { addStateObserver } from '../../../state';
import createStatInfo from '../stat-info';


export default function () {
    const info = createStatInfo(`score: ${0}`);
    addStateObserver(['score'], ({ score }) => {
        info.innerText = `score: ${score}`;
    });
    return info;
}
