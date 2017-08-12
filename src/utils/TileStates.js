export const EMPTY = "empty";
export const FILLED = "filled";
export const CROSSED = "crossed";
export const TILE_STATES = Object.freeze([
	EMPTY, FILLED, CROSSED
])

export const MAX_INDEX = TILE_STATES.length - 1;
export const MAX = TILE_STATES[ MAX_INDEX ];
