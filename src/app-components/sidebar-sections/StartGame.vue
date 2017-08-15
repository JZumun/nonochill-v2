<template lang="pug">
	sidebar-section(title="Play", :closed="closed" @toggle="s=>this.closed=!s")
		form(@submit.prevent="start")
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" v-model.number="size" )
				range-field( name="Colors" :min="1" :max="5" v-model.number="colors" )
				range-field( name="Density" :min="0.6" :max="0.95" :step="0.05" v-model.number="density" )
				button Start New Game
		form(@submit.prevent="startWithCode")
			fieldset
				legend Load Game
				small paste code below
				textarea(v-model="code" spellcheck="false" onclick="this.focus();this.select()" rows="5")
				button Load
</template>

<script>
	import SidebarSection from "./SidebarSection.vue"
	import RangeField from "../form/RangeField.vue"

	import Bus from "../../pubsub/Bus"
	import { GAME_WIN_EVT, GAME_START_EVT, GAME_BAD_SERIAL_EVT, GAME_READY_EVT } from "../../pubsub/Events"

	export default {
		components: { SidebarSection, RangeField },
		data() {
			return {
				size: 5,
				density: 0.6,
				colors: 3,
				code: "",
				closed: false
			}
		},
		methods: {
			start() {
				Bus.$emit(GAME_START_EVT,{
					size: this.size,
					colors: this.colors ,
					density: this.density
				})
			},
			startWithCode() {
				Bus.$emit(GAME_START_EVT,{
					code: this.code
				})
			}
		},
		created() {
			Bus.$on(GAME_BAD_SERIAL_EVT,e=>this.code=e)
			Bus.$on(GAME_READY_EVT,e=>this.closed=true)
			Bus.$on(GAME_WIN_EVT,e=>this.closed=false)
		}
	}
</script>
