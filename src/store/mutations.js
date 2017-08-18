import originalColors from "./values/colors"

export const CHANGE_MODE = "change-mode";
export const CHANGE_COLORS = "change-colors";
export const CHANGE_COLOR = "change-color";
export const RESET_COLORS = "reset-colors";
export default {
	[CHANGE_MODE](state,mode) {
		state.mode = mode;
	},
	[CHANGE_COLORS](state,colors) {
		state.colors = colors.slice();
	},
	[CHANGE_COLOR](state,{index,value}) {
		state.colors.splice(index,1,value);
	},
	[RESET_COLORS]() {
		state.colors = originalColors;
	}
}
