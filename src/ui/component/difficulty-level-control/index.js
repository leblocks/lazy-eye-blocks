import { getState, setState, addStateObserver } from '../../../state';

const difficultyLevelIndicator = () => {
    const id = 'difficultyIndicator';
    const element = document.createElement('span');
    element.setAttribute('id', id);
    element.innerText = 0;

    // handle state updates
    addStateObserver(({ levelOfDifficulty }) => {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.innerText = levelOfDifficulty;
        }
    });
    return element;
};

const incrementDifficultyLevel = (delta) => {
    const { levelOfDifficulty } = getState();
    setState({ levelOfDifficulty: levelOfDifficulty + delta });
};

export default function () {
    const element = document.createElement('div');
    element.classList.add('ui-menu-item');

    const span = document.createElement('span');
    span.innerText = 'Level of difficulty:';

    const increaseDifficultyButton = document.createElement('button');
    increaseDifficultyButton.onclick = () => incrementDifficultyLevel(1);
    increaseDifficultyButton.innerText = '+';

    const decreaseDifficultyButton = document.createElement('button');
    decreaseDifficultyButton.onclick = () => incrementDifficultyLevel(-1);
    decreaseDifficultyButton.innerText = '-';

    element.appendChild(span);
    element.appendChild(decreaseDifficultyButton);
    element.appendChild(difficultyLevelIndicator());
    element.appendChild(increaseDifficultyButton);

    return element;
}
