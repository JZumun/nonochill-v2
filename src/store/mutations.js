import originalColors from "./values/colors";
import modes from "./values/modes";

import { square, count } from "utils/ArrayUtils";
import { clearHistory } from "store/modules/history";

export const CHANGE_MODE = "change-mode";
export const CHANGE_COLORS = "change-colors";
export const CHANGE_COLOR = "change-color";
export const RESET_COLORS = "reset-colors";

export const START_GAME = "start-game";
export const START_EDITOR = "start-editor";

export const RESET_BOARD = "reset-board";
export const SET_BOARD = "set-board";
export const SET_TILE = "set-tile";
export const SET_TILES = "set-tiles";
export const UPDATE_RULES = "update-rules";

export const ANCHOR_COLOR = "anchor-color";
export const UNANCHOR_COLOR = "unanchor-color";

export const REVERSE_COLOR = "reverse-color";



const updateBoard = (oldBoard, moves) => moves.reduce((board, { tile: { x, y }, next }) => {
	board[x][y] = next;
	return board;
}, oldBoard.slice());

const clearBoard = size => square(size, el => 0);

export default {
	[START_GAME] (state, { size, rules, colors, scheme = originalColors.slice(), board = clearBoard(size) }) {
		state.rules = rules;
		state.colorScheme = scheme;
		state.colorNum = colors;
		state.mode = modes.GAME_SETUP;
		state.board = board;
		clearHistory(state);
	},
	[START_EDITOR] (state, { size, colors, scheme = originalColors.slice() }) {
		state.colorScheme = scheme;
		state.colorNum = colors;
		state.rules = {
			column: count(size).map(el => []),
			row: count(size).map(el => [])
		};

		state.board = clearBoard(size);
		clearHistory(state);
	},
	[CHANGE_MODE] (state, mode) {
		state.mode = mode;
	},

	[CHANGE_COLORS] (state, colors) {
		state.colorScheme = colors.slice();
	},
	[CHANGE_COLOR] (state, { index, value }) {
		state.colorScheme.splice(index, 1, value);
	},
	[RESET_COLORS] (state) {
		state.colorScheme = originalColors;
	},

	[RESET_BOARD] (state) {
		state.board = clearBoard(state.board.length);
		clearHistory(state);
	},
	[SET_BOARD] (state, newBoard) {
		state.board = newBoard;
		clearHistory(state);
	},
	[UPDATE_RULES] (state, rules) {
		state.rules = rules;
	},

	[SET_TILE] (state, payload) {
		state.board = updateBoard(state.board, [payload]);
	},
	[SET_TILES] (state, payload) {
		state.board = updateBoard(state.board, payload);
	},

	[ANCHOR_COLOR] (state, key) {
		state.colorAnchor = key;
	},
	[UNANCHOR_COLOR] (state, key) {
		state.colorAnchor = null;
	},
	[REVERSE_COLOR] (state, value) {
		state.colorReverse = value;
	}
};
