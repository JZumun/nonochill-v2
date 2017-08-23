import { SET_TILE, STAGE_MOVE, COMMIT_MOVES } from "./mutations"
import debounce from "debounce";

const commitStagedMoves = debounce(function(commit){
	commit(COMMIT_MOVES);
},500)

export const ACTION_SET_TILE = "action:set-tile"
export default {
	[ACTION_SET_TILE]({commit},payload) {
		commit(SET_TILE,payload)
		commit(STAGE_MOVE,payload);

		commitStagedMoves(commit);
	}
}
