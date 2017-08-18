import Vue from 'vue'
import Vuex from 'vuex'

import mode from "./values/modes"
import colors from "./values/colors"
import mutations from "./mutations"

Vue.use(Vuex)
const state = {
	mode: mode.NULL,
	colors: [...colors],
	serialization: ""
}



export default new Vuex.Store({
	state, mutations
})
