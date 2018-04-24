import { ACTION_SET_TILE } from "store/actions";
import blop from "assets/sounds/blop.mp3";

let blopAudio = null;
const getBlopAudio = () => blopAudio || (blopAudio = new Audio(blop));

const play = (audio, volume = 1) => {
	if (!audio.ended) { audio.currentTime = 0 }
	audio.volume = volume;
	audio.play();
}

export default {
	actions: {
		[ACTION_SET_TILE]() {
			play(getBlopAudio(), 0.15);
		}
	}
}
