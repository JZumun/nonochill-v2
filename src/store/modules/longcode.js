export default {
	namespaced: true,
	state: {
		code: null
	},
	mutations: {
		setCode(state, value) {
			state.code = value
		}
	}
}