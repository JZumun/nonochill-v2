import Vue from "vue";
import Vuex from "vuex";

import colors from "./values/colors";
import mutations from "./mutations";
import actions from "./actions";

import { serialize } from "utils/game/Serializer";
import incrementColor from "utils/game/IncrementColor";

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
	colorsUsed: ({ colorNum, colorScheme }) => colorScheme.slice(0, colorNum),
	colorAt:({board}) => (x,y) => {
		return board[x][y];
	},
	nextColor: ({board, colorAnchor, colorNum, colorReverse, disableCrossed}) => (x,y) => {
		const curr = board[x][y];
		if (!colorAnchor) {
			return incrementColor(curr, colorNum, colorReverse, disableCrossed ? 0 : -1)
		} else {
			let next = incrementColor(curr === colorAnchor ? 1 : curr > 0 ? 0 : curr, 1, colorReverse, disableCrossed ? 0 : -1);
			return next === 1 ? colorAnchor : next;
		}
	}
};

import shortCode from "store/modules/shortcode";
import localSave from "store/modules/localsave";
import history from "store/modules/history";
import puzzleList from "store/modules/puzzleList";
import start from "store/modules/startOptions";
import editor from "store/modules/editorOptions";
import toggle from "store/modules/toggleOptions";
import sounds from "store/modules/soundManager";
import background from "store/modules/background";

const modules = {
	background,
	sounds,
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
