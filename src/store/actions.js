import Vue from "vue";
import { SET_TILE,
	START_GAME, START_EDITOR, CHANGE_MODE,
	ANCHOR_COLOR, UNANCHOR_COLOR, REVERSE_COLOR,
	UPDATE_RULES,
	SET_BOARD } from "./mutations";

import { ACTION_LOAD_FROM_SHORTCODE, CLEAR_SHORTCODE } from "store/modules/shortcode";

import incrementColor from "utils/game/IncrementColor";
import generateRule from "utils/game/GenerateRule";
import { count } from "utils/ArrayUtils";
import { deserialize } from "utils/game/Serializer";

import modes, { isCreatorMode } from "./values/modes";

export const ACTION_SET_TILE = "action:set-tile";
export const ACTION_TOGGLE_TILE = "action:toggle-tile";

export const ACTION_START_GAME = "action:start-game";
export const ACTION_START_EDITOR = "action:start-editor";

export const ACTION_ANCHOR_COLOR = "action:anchor-color";
export const ACTION_REVERSE_COLOR = "action:reverse-color";

export const ACTION_CREATOR_UPDATE_RULES = "action:rules-match-board";

export default {
	[ACTION_SET_TILE] ({ commit }, payload) {
		if (payload.next !== payload.curr) {
			commit(SET_TILE, payload);
		}
	},
	[ACTION_TOGGLE_TILE] ({ commit, dispatch, state }, tile) {
		const curr = state.board[tile.x][tile.y];
		let next;
		if (!state.colorAnchor) {
			next = incrementColor(curr, state.colorNum, state.colorReverse);
		} else {
			next = incrementColor(curr === state.colorAnchor ? 1 : curr > 0 ? 0 : curr, 1, state.colorReverse);
			next = next === 1 ? state.colorAnchor : next;
		}

		dispatch(ACTION_SET_TILE, { tile, curr, next });
		dispatch(ACTION_CREATOR_UPDATE_RULES);
	},

	[ACTION_CREATOR_UPDATE_RULES] ({ commit, state }) {
		if (isCreatorMode(state.mode)) {
			commit(UPDATE_RULES, {
				row: state.board.map(row => generateRule(row)),
				column: count(state.board.length).map(col => generateRule(state.board.map(row => row[col])))
			});
		}
	},

	[ACTION_START_GAME] ({ commit, dispatch }, payload) {
		if (typeof payload === "string") {
			try {
				const options = deserialize(payload);
				payload = {
					size: options.width,
					rules: {
						row: options.row,
						column: options.column
					},
					colors: options.colors,
					scheme: options.colorScheme
				};
			} catch (e) {
				return dispatch(ACTION_LOAD_FROM_SHORTCODE, payload);
			}
		}

		commit(CLEAR_SHORTCODE);
		commit(CHANGE_MODE, modes.GAME_SETUP);
		commit(START_GAME, payload);

		Vue.nextTick(_ => commit(CHANGE_MODE, modes.GAME_READY));
	},
	[ACTION_START_EDITOR] ({ commit }, payload) {
		commit(CLEAR_SHORTCODE);
		commit(CHANGE_MODE, modes.CREATOR);
		commit(START_EDITOR, payload);

		Vue.nextTick(_ => commit(CHANGE_MODE, modes.CREATOR_READY));
	},

	[ACTION_ANCHOR_COLOR] ({ commit, state }, value) {
		if (value == null) { commit(UNANCHOR_COLOR); } else if (state.anchor !== value && state.colorNum >= value) {
			commit(ANCHOR_COLOR, value);
		}
	},
	[ACTION_REVERSE_COLOR] ({ commit, state }, value) {
		if (state.colorReverse !== value) commit(REVERSE_COLOR, value);
	}
};
