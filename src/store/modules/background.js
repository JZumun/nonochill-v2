import api from "api/api";
import loading from "store/mixins/loading";

export const ACTION_RETRIEVE_BG_INFO = "action:retrieve:bg";

export default {
	namespaced: true,
	state() {
		return {
			url: null,
			author: {
				name: null,
				url: null,
			},
			...loading.state,
		};
	},
	mutations: {
		set(state, image) {
			state.url = image.url;
			state.author = image.author;
		},
		...loading.mutations,
	},
	actions: {
		...loading.actions,
		[ACTION_RETRIEVE_BG_INFO]: {
			root: true,
			handler({ commit, dispatch }) {
				return dispatch("load", () =>
					api({
						url: "bg",
						method: "get",
					}).then((data) => commit("set", data.image))
				);
			},
		},
	},
};
