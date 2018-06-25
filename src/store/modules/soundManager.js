import { ACTION_SET_TILE, ACTION_WIN_GAME } from "store/actions";
import blop from "assets/sounds/blop.mp3";
import snap from "assets/sounds/snap.mp3";
import backgroundMusic from "assets/sounds/escapism.mp3";

import workWithStorage from "utils/Storage.js";
const saveToStorage = (key, value) => workWithStorage(
	storage => storage.setItem(key, JSON.stringify(value))
);
const loadFromStorage = (key, def) => workWithStorage(storage => {
	if (storage[key]) {
		return JSON.parse(storage[key]);
	} else return def;
}, _ => def);

const play = (audio, volume = 1, muted = false) => {
	if (muted) return;
	if (!audio.ended) { audio.currentTime = 0; }
	audio.volume = volume;
	audio.play();
};

const cachedAudioGetter = (file) => {
	let cachedAudio = null;
	return () => cachedAudio || (cachedAudio = new window.Audio(file));
};

const getBlopAudio = cachedAudioGetter(blop);
const getSnapAudio = cachedAudioGetter(snap);
const getBackgroundAudio = cachedAudioGetter(backgroundMusic);

const playBackgroundAudio = (play = true) => {
	const player = getBackgroundAudio();
	if (play) {
		player.loop = true;
		player.play();
	} else {
		player.pause();
	}
};

export const SET_EFFECTS_VOLUME = "mutation:sounds:effects-volume";
export const SET_MUSIC_VOLUME = "mutation:sounds:music-volume";
export const PLAY_MUSIC = "mutations:sounds:music-play";
export const MUTE_MUSIC = "mutations:sounds:music-mute";
export const MUTE_EFFECTS = "mutations:sounds:effects-mute";
export const PLAY_EFFECT = "mutations:sounds:effects-play";
export const LOAD_FROM_LOCAL = "mutations:sounds:load";
export default {
	state: {
		music: {
			volume: 0.5,
			muted: false
		},
		effects: {
			volume: 0.5,
			muted: false
		}
	},
	mutations: {
		[LOAD_FROM_LOCAL] (state) {
			state.music.volume = loadFromStorage("sound.music.volume", 0.5);
			state.music.muted = loadFromStorage("sound.music.muted", false);
			state.effects.volume = loadFromStorage("sound.effects.volume", 0.5);
			state.effects.muted = loadFromStorage("sound.effects.muted", false);
		},
		[SET_EFFECTS_VOLUME] (state, volume) {
			state.effects.volume = volume;
			saveToStorage("sound.effects.volume", volume);
		},
		[MUTE_EFFECTS] (state, mute = true) {
			state.effects.muted = mute;
			saveToStorage("sound.effects.muted", mute);
		},
		[SET_MUSIC_VOLUME] (state, volume) {
			state.music.volume = volume;
			getBackgroundAudio().volume = volume;
			saveToStorage("sound.music.volume", volume);
		},
		[PLAY_EFFECT] (state, audio) {
			play(audio, state.effects.volume, state.effects.muted);
		},
		[PLAY_MUSIC] (state) {
			if (!state.music.muted) {
				playBackgroundAudio(play);
			}
		},
		[MUTE_MUSIC] (state, mute = true) {
			state.music.muted = mute;
			playBackgroundAudio(!mute);
			saveToStorage("sound.music.muted", mute);
		}
	},
	actions: {
		[ACTION_SET_TILE] ({ state, commit }) {
			commit(PLAY_EFFECT, getBlopAudio());
		},
		[ACTION_WIN_GAME] ({ state, commit }) {
			commit(PLAY_EFFECT, getSnapAudio());
		}
	}
};
