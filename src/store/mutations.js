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
export const UPDATE_RULES = "update-rules";

export const STAGE_MOVE = "stage-move";
export const COMMIT_MOVES = "commit-moves";
export const UNDO_MOVE = "undo-move";
export const REDO_MOVE = "redo-move";

const invertMove = move => ({
	undone: true,
	tile: move.tile,
	next: move.curr,
	curr: move.next
})
const invertMoves = moves => moves.reverse().map(invertMove)

const updateBoard = (oldBoard,moves) => moves.reduce((board,{tile:{x,y},next})=>{
	board[x][y] = next;
	return board;
},oldBoard.slice());

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
	[UPDATE_RULES](state,rules) {
		state.rules = rules;
	},

	[SET_TILE](state,payload) {
		state.board = updateBoard(state.board,[payload]);
	},
	[STAGE_MOVE](state,payload) {
		state.history.future = [];
		state.history.staged.push(payload);
	},
	[COMMIT_MOVES](state) {
		state.history.past.push(state.history.staged);
		state.history.staged = [];
	},
	[UNDO_MOVE](state) {
		const moves = invertMoves(state.history.past.pop());
		state.board = updateBoard(state.board,moves);
		state.history.future.push(moves);
	},
	[REDO_MOVE](state) {
		const moves = invertMoves(state.history.future.pop());
		state.board = updateBoard(state.board, moves);
		state.history.past.push(moves);
	}
}
