import debounce from "throttle-debounce/debounce";

export default (audioFile, { maxVolume = 1, volume=0.5, muted = false, looping = false, paused = true } = {}) => {
	const audio = new window.Audio(audioFile);
	audio.volume = maxVolume*volume;

	return {
		namespaced: true,
		state () {
			return {
				volume: maxVolume*volume,
				muted,
				looping,
				paused
			};
		},
		mutations: {
			setVolume (state, vol) {
				state.volume = vol;
				audio.volume = maxVolume*vol;
			},
			mute (state, mute) {
				state.muted = mute;
			},
			loop (state, val) {
				state.looping = val;
				audio.loop = val;
			},
			setPausedValue (state, val) {
				state.paused = val;
			}
		},
		actions: {
			play: debounce(200, true, function ({ commit, state }) {
				if (state.muted) return;
				if (!state.looping) {
					audio.currentTime = 0;
				}
				commit("setPausedValue", false);
				return audio.play().catch(e => {
					console.warn(e);
					commit("setPausedValue", true);
				});
			}),
			pause ({ commit, state }) {
				audio.pause();
				commit("setPausedValue", true);
			}
		}
	};
};
