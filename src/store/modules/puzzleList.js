import api from "api/api";
import loading from "store/mixins/loading";

export const ACTION_LOAD_PUZZLE_LIST = "action:list:puzzles";

export default {
	namespaced: true,
	state: {
		...loading.state,
		puzzles: []
	},
	mutations: {
		...loading.mutations,
		setPuzzles (state, puzzles) { state.puzzles = puzzles; }
	},
	actions: {
		...loading.actions,
		[ACTION_LOAD_PUZZLE_LIST]: {
			root: true,
			handler: ({ commit, dispatch }) =>
				dispatch("load", _ => api({
					method: "get"
				}).then(data => commit("setPuzzles", data.games)))
		}
	}
};
