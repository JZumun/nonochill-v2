export default {
	state: {
		loading: false,
		errorMessage: null
	},
	mutations: {
		setLoading (state, value) {
			state.loading = value;
		},
		setErrorMessage (state, value) {
			state.errorMessage = value;
		}
	},
	actions: {
		load ({ commit }, action) {
			commit("setLoading", true);
			commit("setErrorMessage", null);
			return action()
				.catch(e => commit("setErrorMessage", e.message))
				.then(_ => commit("setLoading", false));
		}
	}
};
