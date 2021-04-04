// app configuration

// interval between game ticks
export const BASE_DESCENT_RATE = 1500;
// game ticks can't be faster than that
export const MINIMUM_DESCENT_RATE = 100;
// descent rate speed up on speed level increment
export const DECENT_RATE_DECREMENT_STEP = 75;

export const SPEED_LEVEL_INCREMENT = 5;
// amount of bonus score points for clearing 4 lines simultaneously
export const TETRIS_BONUS = 10;

export const BACKGROUND_COLOR = '#000000';
export const GRID_COLOR = '#ffffff';
export const NEXT_SHAPE_COLOR = '#f5eace';
export const NEXT_LEVEL_INDICATOR_COLOR = '#f8fc03';

export const NEXT_SHAPE_DRAW_SCALE = 0.25;
export const GRID_WIDTH = 1;
export const PROGRESS_BAR_WIDTH = 5;

export const INITIAL_BOARD_COLUMNS_COUNT = 17;
export const INITIAL_BOARD_ROWS_COUNT = 20;

// specifies approximately how much of the shapes/cells should be
// colored for specific eye
// this number must be between 0 and 1 exclusively
// check blocks/utils/shape-creation-utils.js
export const LEFT_RIGHT_DISTRIBUTION = 0.5;

// key to lookup in a local storage during save\load of settings
export const LOCAL_STORAGE_SETTINGS_KEY = 'c8d6669b-2153-4780-b345-9be69d36fc9d';
