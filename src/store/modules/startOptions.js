import { random } from "utils/RandomUtils";
export default {
	namespaced: true,
	state () {
		return {
			minSize: 5,
			maxSize: 20,
			sizeStep: 5,
			size: random(5, 10, 5),
			maxColors: 5,
			colors: random(1, 5)
		};
	},
	mutations: {
		randomize (state) {
			state.size = random(5, 15, 5);
			state.colors = random(1, 5);
		},
		setSize (state, value) {
			state.size = parseInt(value);
			const newMax = state.size > 15 ? 2 : 5;
			const oldMax = state.maxColors;
			state.colors = Math.max(1, Math.floor(newMax * state.colors/oldMax))
			state.maxColors = newMax;
		},

		setColors (state, value) {
			state.colors = parseInt(value);
		}
	}
};
