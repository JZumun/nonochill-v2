import api from "api/api";

export const ACTION_LOAD_PUZZLE_LIST = "action:list:puzzles";
const SET_PUZZLES = "mutation:puzzles";
const SET_LOADING = "mutation:puzzles:set-loading";
const SET_ERROR = "mutation:puzzles:set-error";

export default {
	state: {
		puzzles: [],
		loading: false,
		error: null
	},
	mutations: {
		[SET_PUZZLES] (state, puzzles) { state.puzzles = puzzles; },
		[SET_LOADING] (state, loading) { state.loading = loading; },
		[SET_ERROR] (state, error) { state.error = error; }
	},
	actions: {
		[ACTION_LOAD_PUZZLE_LIST] ({ commit }) {
			commit(SET_LOADING, true);
			commit(SET_ERROR, null);
			return api({
				method: "get"
			}).then(data => commit(SET_PUZZLES, data.games))
				.catch(e => commit(SET_ERROR, e.message))
				.then(_ => commit(SET_LOADING, false));
		}
	}
};
