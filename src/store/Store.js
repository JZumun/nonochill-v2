import Vue from "vue";
import Vuex from "vuex";

import colors from "./values/colors";
import mutations from "./mutations";
import actions from "./actions";

import { serialize } from "utils/game/Serializer";

Vue.use(Vuex);
const state = {
	colorScheme: [...colors],
	colorNum: 3,
	colorAnchor: null,
	colorReverse: false,
	disableCrossed: false,
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
import soundManager from "store/modules/soundManager";
import puzzleList from "store/modules/puzzleList";
import start from "store/modules/StartOptions";
import editor from "store/modules/editorOptions";
import toggle from "store/modules/toggleOptions";

const modules = {
	soundManager,
	shortCode,
	localSave,
	history,
	puzzles: puzzleList,
	options: {
		namespaced: true,
		modules: { start, editor }
	},
	accessibility: {
		namespaced: true,
		modules: {
			shortcut: toggle,
			floatingOptions: toggle
		}
	}
};

export default new Vuex.Store({
	modules,
	state,
	getters,
	mutations,
	actions
});
