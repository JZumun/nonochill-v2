import Vue from 'vue'
import Vuex from 'vuex'

import mode from "./values/modes"
import colors from "./values/colors"
import mutations from "./mutations"
import actions from "./actions"

import { serialize } from "../game-components/utils/Serializer"

Vue.use(Vuex)
const state = {
	mode: mode.INIT,
	colorScheme: [...colors],
	colorNum: 3,
	board: [],
	rules: {
		column: [],
		row: []
	},
	history: {
		staged: [],
		past: [],
		future: []
	}
}

const getters = {
	serialization: ({board,colorNum,colorScheme,rules}) => serialize({
		width: board.length,
		height: board.length,
		colors: colorNum,
		column: rules.column,
		row: rules.row,
		colorScheme
	}),
	colorsUsed: ({colorNum, colorScheme}) => colorScheme.slice(0,colorNum)
}



export default new Vuex.Store({
	state,
	getters, 
	mutations,
	actions
})
