<template lang="pug">
	sidebar-section(title="Options", :initiallyHidden="true")
		fieldset
			legend Level Code
			small copy this code to share this level with others.
			textarea(v-model="code" readonly onclick="this.focus();this.select()")
</template>

<script>
	import SidebarSection from "./SidebarSection.vue"

	import Bus from "../../pubsub/Bus"
	import { GAME_READY_EVT } from "../../pubsub/Events"

	export default {
		components: {SidebarSection},
		data() {
			return {
				code: ""
			}
		},
		created() {
			Bus.$on(GAME_READY_EVT,serialization=>this.code=serialization);
		}
	}
</script>
