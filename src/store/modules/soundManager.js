import { ACTION_SET_TILE, ACTION_WIN_GAME } from "store/actions";
import blop from "assets/sounds/blop.mp3";
import snap from "assets/sounds/snap.mp3";

const play = (audio, volume = 1) => {
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

export default {
	actions: {
		[ACTION_SET_TILE]() {
			play(getBlopAudio(), 0.15);
		},
		[ACTION_WIN_GAME]() {
			play(getSnapAudio(), 0.15);
		}
	}
}
