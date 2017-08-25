import { SET_TILE, STAGE_MOVE, COMMIT_MOVES } from "./mutations"
import debounce from "debounce";
import incrementColor from "utils/game/IncrementColor"

const commitStagedMoves = debounce(function(commit){
	commit(COMMIT_MOVES);
},500)

export const ACTION_SET_TILE = "action:set-tile"
export const ACTION_TOGGLE_TILE = "action:toggle-tile"

export default {
	[ACTION_SET_TILE]({commit},payload) {
		commit(SET_TILE,payload)
		commit(STAGE_MOVE,payload);

		commitStagedMoves(commit);
	},
	[ACTION_TOGGLE_TILE]({commit,dispatch,state},{tile,curr}) {
		let next;
		if (!state.colorAnchor) {
			next = incrementColor( curr, state.colorNum, state.colorReverse )
		} else {
			next = incrementColor( curr == state.colorAnchor ? 1 : curr > 0 ? 0 : curr, 1, state.colorReverse );
			next = next == 1 ? state.colorAnchor : next;
		}

		if (next != curr) {
			dispatch(ACTION_SET_TILE, {
				tile, curr, next
			})
		}
	}
}
