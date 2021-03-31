/**
 * Extracts game related settings from the provided state.
 * @param {Object} state Current state object.
 */
export default function (state) {
    const {
        rows,
        columns,
        gridEnabled,
        coloringMode,
        leftEyeColor,
        rightEyeColor,
        increaseSpeedLevel,
    } = state;

    return {
        rows,
        columns,
        gridEnabled,
        coloringMode,
        leftEyeColor,
        rightEyeColor,
        increaseSpeedLevel,
    };
}
