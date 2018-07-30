import { ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
import loading from "store/mixins/loading";
import api from "api/api";

export const ACTION_GENERATE_SHORTCODE = "action:short-code:generate";
export const ACTION_LOAD_FROM_SHORTCODE = "action:short-code:load";
export const CLEAR_SHORTCODE = "mutation:short-code:clear";
export const SET_SHORT_CODE = "mutation:short-code:set";

export default {
	state: {
		code: null,
		...loading.state
	},
	mutations: {
		[SET_SHORT_CODE] (state, value) {
			state.code = value;
		},
		[CLEAR_SHORTCODE] (state) {
			state.code = null;
		},
		...loading.mutations
	},
	actions: {
		...loading.actions,
		[ACTION_GENERATE_SHORTCODE]: {
			root: true,
			handler: ({ dispatch, commit, getters }) =>
				dispatch("load", _ => api({
					data: { game: getters.serialization }
				}).then(data => commit(SET_SHORT_CODE, data.id)))
		},
		[ACTION_LOAD_FROM_SHORTCODE]: {
			root: true,
			handler ({ dispatch, commit }, code) {
				if (code == null || code.trim().length === 0) {
					return commit("setError", "invalid game id");
				} else {
					return dispatch("load", _ => api({
						url: `${code}`,
						method: "get"
					}).then(data => dispatch(ACTION_START_GAME_FROM_LONGCODE, data.game, { root: true }))
						.then(() => commit(SET_SHORT_CODE, code)));
				}
			}
		}
	}
};
