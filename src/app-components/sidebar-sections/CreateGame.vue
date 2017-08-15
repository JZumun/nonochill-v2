<template lang="pug">
	sidebar-section(title="Level Editor", :closed="closed" @toggle="s=>this.closed=!s")
		form(@submit.prevent="start")
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="25" v-model.number="size" )
				range-field( name="Colors" :min="1" :max="5" v-model.number="colors" )
				button Start
</template>

<script>
	import SidebarSection from "./SidebarSection.vue"
	import RangeField from "../form/RangeField.vue"

	import Bus from "../../pubsub/Bus"
	import { CREATOR_START_EVT, GAME_READY_EVT } from "../../pubsub/Events"

	export default {
		components: { SidebarSection, RangeField },
		data() {
			return {
				size: 5,
				colors: 3,
				closed: true
			}
		},
		methods: {
			start() { Bus.$emit(CREATOR_START_EVT,{
				size: this.size,
				colors: this.colors
			}) }
		}
	}
</script>
