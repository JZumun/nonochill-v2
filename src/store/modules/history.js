import debounce from "throttle-debounce/debounce";
import { ACTION_SET_TILE } from "store/actions";
import { SET_TILES, START_GAME, START_EDITOR, SET_BOARD, RESET_BOARD } from "store/mutations";

const invertMove = move => ({
	undone: true,
	tile: move.tile,
	next: move.curr,
	curr: move.next
});
const invertMoves = moves => moves.reverse().map(invertMove);
const getTopMove = list => list.length === 0 ? [] : invertMoves(list[list.length - 1]);

export const STAGE_MOVE = "mutation:history:stage";
export const COMMIT_MOVES = "mutation:history:commit";
export const UNDO_MOVE = "mutation:history:undo";
export const REDO_MOVE = "mutation:history:redo";
export const CLEAR_HISTORY = "mutations:history:clear";
export const ACTION_UNDO_MOVE = "action:history:undo";
export const ACTION_REDO_MOVE = "action:history:redo";

const clearHistory = state => {
	state.past = [];
	state.staged = [];
	state.future = [];
};

const commitStagedMoves = debounce(500, commit => commit(COMMIT_MOVES));

export default {
	state: {
		staged: [],
		past: [],
		future: []
	},
	getters: {
		lastMove: ({ past }) => getTopMove(past),
		nextMove: ({ future }) => getTopMove(future)
	},
	mutations: {
		[STAGE_MOVE] (state, payload) {
			state.future = [];
			state.staged.push(payload);
		},
		[COMMIT_MOVES] (state) {
			state.past.push(state.staged);
			state.staged = [];
		},
		[UNDO_MOVE] (state, moves) {
			state.future.push(moves);
			state.past.pop();
		},
		[REDO_MOVE] (state, moves) {
			state.past.push(moves);
			state.future.pop();
		},
		[CLEAR_HISTORY]: clearHistory,
		[START_GAME]: clearHistory,
		[START_EDITOR]: clearHistory,
		[RESET_BOARD]: clearHistory,
		[SET_BOARD]: clearHistory
	},
	actions: {
		[ACTION_SET_TILE] ({ commit }, payload) {
			commit(STAGE_MOVE, payload);
			commitStagedMoves(commit);
		},
		[ACTION_UNDO_MOVE] ({ commit, dispatch, getters, state }) {
			if (state.past.length) {
				const move = getters.lastMove;
				commit(SET_TILES, move);
				commit(UNDO_MOVE, move);
			}
		},
		[ACTION_REDO_MOVE] ({ commit, dispatch, getters, state }) {
			if (state.future.length) {
				const move = getters.nextMove;
				commit(SET_TILES, move);
				commit(REDO_MOVE, move);
			}
		}
	}
};
