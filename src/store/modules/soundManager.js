import sound from "./sound";
import blop from "assets/sounds/blop.mp3";
import snap from "assets/sounds/snap.mp3";
import backgroundMusic from "assets/sounds/escapism.mp3";
import { ACTION_SET_TILE, ACTION_WIN_GAME } from "store/actions";

export default {
	namespaced: true,
	modules: {
		blop: sound(blop),
		snap: sound(snap),
		background: sound(backgroundMusic, { looping: true })
	},
	actions: {
		muteEffects ({ commit }, mute) {
			commit("blop/mute", mute);
			commit("snap/mute", mute);
		},
		setEffectsVolume ({ commit }, volume) {
			commit("blop/setVolume", volume);
			commit("snap/setVolume", volume);
		},
		load ({ commit }) {

		},
		[ACTION_SET_TILE]: {
			root: true,
			handler: ({ dispatch }) => dispatch("blop/play")
		},
		[ACTION_WIN_GAME]: {
			root: true,
			handler: ({ dispatch }) => dispatch("blop/play")
		}
	}
};
