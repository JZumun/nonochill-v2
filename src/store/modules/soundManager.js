import { ACTION_SET_TILE, ACTION_WIN_GAME } from "store/actions";
import blop from "assets/sounds/blop.mp3";
import snap from "assets/sounds/snap.mp3";
import backgroundMusic from "assets/sounds/escapism.mp3";

const play = (audio, volume = 1, muted = false) => {
	if (muted) return;
	if (!audio.ended) { audio.currentTime = 0 }
	audio.volume = volume;
	audio.play();
}

const cachedAudioGetter = (file) => {
	let cachedAudio = null;
	return () => cachedAudio || (cachedAudio = new Audio(file));
}

const getBlopAudio = cachedAudioGetter(blop);
const getSnapAudio = cachedAudioGetter(snap);
const getBackgroundAudio = cachedAudioGetter(backgroundMusic);

export const SET_EFFECTS_VOLUME = "mutation:sounds:effects-volume";
export const SET_MUSIC_VOLUME = "mutation:sounds:music-volume";
export const PLAY_MUSIC = "mutations:sounds:music-play";
export const MUTE_EFFECTS = "mutations:sounds:effects-mute";
export const PLAY_EFFECT = "mutations:sounds:effects-play";
export default {
	state: {
		music: {
			volume: 0.5,
			playing: false
		},
		effects: {
			volume: 0.5,
			muted: false
		}
	},
	mutations: {
		[SET_EFFECTS_VOLUME](state, volume) {
			state.effects.volume = volume;
		},
		[MUTE_EFFECTS](state, mute = true) {
			state.effects.muted = mute;
		},
		[SET_MUSIC_VOLUME](state, volume) {
			state.music.volume = volume;
			getBackgroundAudio().volume = volume;
		},
		[PLAY_EFFECT](state, audio) {
			play(audio, state.effects.volume, state.effects.muted);
		},
		[PLAY_MUSIC](state, play = true) {
			state.music.playing = play;
			const player = getBackgroundAudio();
			if (play) {
				player.loop = true;
				player.play();
			} else {
				player.pause();
			}
		}
	},
	actions: {
		[ACTION_SET_TILE]({state, commit}) {
			commit(PLAY_EFFECT, getBlopAudio());
		},
		[ACTION_WIN_GAME]({state, commit}) {
			commit(PLAY_EFFECT, getSnapAudio());
		}
	}
}
