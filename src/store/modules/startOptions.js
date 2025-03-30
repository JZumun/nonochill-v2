import { random } from "utils/RandomUtils";
export default {
	namespaced: true,
	state () {
		return {
			size: random(5, 20),
			colors: random(1, 5)
		};
	},
	mutations: {
		randomize (state) {
			state.size = random(5, 20);
			state.colors = random(1, 5);
		},
		setSize (state, value) {
			state.size = parseInt(value);

		},
		setColors (state, value) {
			state.colors = parseInt(value);
		}
	}
};
