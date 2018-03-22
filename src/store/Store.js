import Vue from "vue";
import Vuex from "vuex";

import mode from "./values/modes";
import colors from "./values/colors";
import mutations from "./mutations";
import actions from "./actions";

import { serialize } from "utils/game/Serializer";

Vue.use(Vuex);
const state = {
	mode: mode.INIT,
	colorScheme: [...colors],
	colorNum: 3,
	colorAnchor: null,
	colorReverse: false,
	board: [],
	rules: {
		column: [],
		row: []
	}
};

const getters = {
	serialization: ({ board, colorNum, colorScheme, rules }) => serialize({
		width: board.length,
		height: board.length,
		colors: colorNum,
		column: rules.column,
		row: rules.row,
		colorScheme
	}),
	colorsUsed: ({ colorNum, colorScheme }) => colorScheme.slice(0, colorNum)
};

import shortCode from "store/modules/shortcode";
import localSave from "store/modules/localsave";
import history from "store/modules/history";
import floatingOptions from "store/modules/floatingOptions";
const modules = {
	shortCode,
	localSave,
	history,
	floatingOptions
}

export default new Vuex.Store({
	modules,
	state,
	getters,
	mutations,
	actions
});
