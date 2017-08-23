<template lang="pug">
	section#sidebar.sidebar.page-section
		h1.game-title NonoChill#[sup v.2]
		sidebar-section(title="Play" :closed="!section[0]" @toggle="toggle(0)")
			start-game
		sidebar-section(title="Level Editor" :closed="!section[1]" @toggle="toggle(1)")
			create-game
		sidebar-section(title="Options", :closed="!section[2]" @toggle="toggle(2)" :disabled="mode == 0")
			game-options
</template>

<script>
	import SidebarSection from "./sidebar-sections/SidebarSection.vue"
	import StartGame from "./sidebar-sections/StartGame.vue"
	import CreateGame from "./sidebar-sections/CreateGame.vue"
	import GameOptions from "./sidebar-sections/GameOptions.vue"

	import modes from "store/values/modes"

	export default {
		components: {SidebarSection, StartGame, GameOptions, CreateGame},
		computed: {
			mode() {
				return this.$store.state.mode;
			}
		},
		watch: {
			mode(val) {
				if (val == modes.INIT){ this.section = [true, false, false] }
				else { this.section = [false, false, true] }
			}
		},
		data() {
			return {
				section: [true,false,false]
			}
		},
		methods: {
			toggle(section) {
				this.section = this.section.map( (val,i) => i == section ? !val : false );
			}
		}
	}
</script>

<style>
	.sidebar {
		background-color:var(--dark-accent);
		color:var(--translucent-white);
		overflow-y:auto;
	}

	.sidebar *+* { margin-top:0.5rem; }

	.game-title {
		font-size:1.5em;
		padding:0.5em;
		text-align:center;
		margin:0;
		background: var(--dark-accent);
		color:var(--translucent-white);
	}
	.game-title sup {
		font-size:0.5em;
		font-weight:bold;
	}
</style>
