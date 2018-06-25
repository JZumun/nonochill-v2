import { random } from "utils/RandomUtils";
export default {
	namespaced: true,
	state () {
		return {
			size: random(5, 20),
			density: random(0.6, 0.95, 0.05),
			colors: random(1, 5)
		};
	},
	mutations: {
		randomize (state) {
			state.size = random(5, 20);
			state.density = random(0.6, 0.95, 0.05);
			state.colors = random(1, 5);
		},
		setSize (state, value) {
			state.size = parseInt(value);
		},
		setDensity (state, value) {
			state.density = parseFloat(value);
		},
		setColors (state, value) {
			state.colors = parseInt(value);
		}
	}
};
