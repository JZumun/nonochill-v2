export const SHOW_FLOATING_OPTIONS = "mutation:floating-options:show";

export default {
	state: {
		show: true,
	},
	mutations: {
		[SHOW_FLOATING_OPTIONS] (state, value) {
			state.show = value;
		}
	}
}
