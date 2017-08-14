<template lang="pug">
	sidebar-section(title="Options", :closed="closed" @toggle="s=>this.closed=!s")
		game-history
		fieldset
			legend board
			small this will also reset your history.
			button(@click="clear") Reset
		fieldset
			legend Level Code
			small copy this code to share this level with others.
			textarea(v-model="code" readonly onclick="this.focus();this.select()")
</template>

<script>
	import GameHistory from "./GameHistory.vue"
	import SidebarSection from "./SidebarSection.vue"

	import Bus from "../../pubsub/Bus"
	import { GAME_READY_EVT, GAME_CLEAR_EVT } from "../../pubsub/Events"

	export default {
		components: {SidebarSection,GameHistory},
		data() {
			return {
				closed: true,
				code: ""
			}
		},
		created() {
			Bus.$on(GAME_READY_EVT,serialization=>{
				this.code=serialization;
				this.closed= false
			});
		},
		methods: {
			clear() {
				Bus.$emit(GAME_CLEAR_EVT);
			}
		}
	}
</script>
