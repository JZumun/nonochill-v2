import { ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
import { SET_BOARD } from "store/mutations";
import { ACTION_SET_SHORTCODE } from "./shortcode";

import workWithStorage from "utils/Storage.js";

const CHANGE_HAS_SAVED_GAME = "mutation:local-save:has";
export const ACTION_SAVE_GAME = "action:local-save:save";
export const ACTION_LOAD_GAME = "action:local-save:load";
export const ACTION_CLEAR_SAVED_GAME = "action:local-save:clear";
export default {
	state: {
		hasSavedGame: workWithStorage(storage => storage.board != null)
	},
	mutations: {
		[CHANGE_HAS_SAVED_GAME] (state, value) {
			state.hasSavedGame = value;
		}
	},
	actions: {
		[ACTION_SAVE_GAME] ({ getters, state, commit, rootState }) {
			workWithStorage(storage => {
				storage.setItem("serialization", getters.serialization);
				storage.setItem("board", JSON.stringify(rootState.board));
				storage.setItem("code", JSON.stringify(rootState.shortCode.code));
				commit(CHANGE_HAS_SAVED_GAME, true);
			});
		},
		[ACTION_LOAD_GAME] ({ dispatch, commit }) {
			workWithStorage(storage => {
				dispatch(ACTION_START_GAME_FROM_LONGCODE, storage.serialization)
					.then(_ => {
						commit(SET_BOARD, JSON.parse(storage.board));
						dispatch(ACTION_SET_SHORTCODE, JSON.parse(storage.code));
					});
			});
		},
		[ACTION_CLEAR_SAVED_GAME] ({ commit }) {
			workWithStorage(storage => {
				storage.clear();
				commit(CHANGE_HAS_SAVED_GAME, false);
			});
		}
	}
};
