import originalColors from "./values/colors"
import modes from "./values/modes"

import { square,count } from "../utils/ArrayUtils"

export const CHANGE_MODE = "change-mode";
export const CHANGE_COLORS = "change-colors";
export const CHANGE_COLOR = "change-color";
export const RESET_COLORS = "reset-colors";

export const START_GAME = "start-game";
export const START_EDITOR = "start-editor";

export const RESET_BOARD = "reset-board";
export const SET_TILE = "set-tile";
export const UPDATE_RULES = "update-rules"

export default {
	[START_GAME](state,{ size, rules, colors, scheme = originalColors.slice() }) {
		state.board = square(size,el=>0);
		state.rules = rules;
		state.colorNum = colors;
		state.colorScheme = scheme;
		state.mode = modes.GAME_SETUP;
	},
	[START_EDITOR](state,{ size, colors, scheme = originalColors.slice() }) {
		state.board = square(size,el=>0);
		state.colorNum = colors;
		state.rules = {
			column: count(size).map(el=>[]),
			row: count(size).map(el=>[])
		}
		state.colorScheme = scheme;
		state.mode = modes.CREATOR;
	},
	[CHANGE_MODE](state,mode) {
		state.mode = mode;
	},

	[CHANGE_COLORS](state,colors) {
		state.colorScheme = colors.slice();
	},
	[CHANGE_COLOR](state,{index,value}) {
		state.colorScheme.splice(index,1,value);
	},
	[RESET_COLORS](state) {
		state.colorScheme = originalColors;
	},
	[RESET_BOARD](state) {
		const size = state.board.length;
		state.board = square(size,el=>0);
	},
	[SET_TILE](state,{tile:{x,y},next}) {
		const board = state.board.slice();
		board[x][y] = next;
		state.board = board;
	},
	[UPDATE_RULES](state,rules) {
		state.rules = rules;
	}
}
