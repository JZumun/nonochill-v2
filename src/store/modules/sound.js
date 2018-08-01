export default (audioFile, { volume = 0.5, muted = false, looping = false, paused = true } = {}) => {
	const audio = new window.Audio(audioFile);

	return {
		namespaced: true,
		state () {
			return {
				volume,
				muted,
				looping,
				paused
			};
		},
		mutations: {
			setVolume (state, vol) {
				state.volume = vol;
				audio.volume = vol;
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
			play ({ commit, state }) {
				if (state.muted) return;
				if (!state.looping) {
					audio.currentTime = 0;
				}
				commit("setPausedValue", false);
				return audio.play().catch(e => {
					console.warn(e);
					commit("setPausedValue", true);
				});
			},
			pause ({ commit, state }) {
				audio.pause();
				commit("setPausedValue", true);
			}
		}
	};
};
