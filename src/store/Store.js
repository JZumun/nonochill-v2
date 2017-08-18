import Vue from 'vue'
import Vuex from 'vuex'

import mode from "./modes"

Vue.use(Vuex)

const originalColors = [
	"#3a1a2f",
	"#A3658C",
	"#e7cbdd",
	"#ff7187",
	"#8db0e1"
]

const state = {
	mode: mode.NULL,
	colors: originalColors.slice(),
	serialization: ""
}

export default new Vuex.Store({
	state
})
