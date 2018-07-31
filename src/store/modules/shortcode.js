import { ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
import loading from "store/mixins/loading";
import api from "api/api";

export const ACTION_GENERATE_SHORTCODE = "action:short-code:generate";
export const ACTION_LOAD_FROM_SHORTCODE = "action:short-code:load";
export const ACTION_SET_SHORTCODE = "action:short-code:set";

export default {
	namespaced: true,
	state: {
		code: null,
		...loading.state
	},
	mutations: {
		setCode (state, value) {
			state.code = value;
		},
		clearCode (state) {
			state.code = null;
		},
		...loading.mutations
	},
	actions: {
		...loading.actions,
		[ACTION_SET_SHORTCODE]: {
			root: true,
			handler: ({ commit }, payload) => commit("setCode", payload)
		},
		[ACTION_GENERATE_SHORTCODE]: {
			root: true,
			handler: ({ dispatch, commit, getters }) =>
				dispatch("load", _ => api({
					data: { game: getters.serialization }
				}).then(data => commit("setCode", data.id)))
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
						.then(() => commit("setCode", code)));
				}
			}
		}
	}
};
