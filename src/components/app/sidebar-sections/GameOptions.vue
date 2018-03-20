<template lang="pug">
	#game-options( :class="{shortcuts}" )
		save-game
		color-scheme
		game-history
		fieldset
			legend Level Code
			small copy this code to share this level with others.
			textarea(v-model="code" readonly onclick="this.focus();this.select()" rows="8")
		fieldset
			legend Other
			label
				input(type="checkbox" v-model="shortcuts")
				| Toggle Shortcut Guide
			br
			label
				input(type="checkbox" v-model="showFloats")
				| Toggle Floating Options
</template>

<script>
	import SaveGame from "./SaveGame.vue";
	import ColorScheme from "./ColorScheme.vue";
	import GameHistory from "./GameHistory.vue";

	import { mapGetters, mapState } from "vuex";
	import { SHOW_FLOATING_OPTIONS } from "store/mutations";

	export default {
		components: { GameHistory, ColorScheme, SaveGame },
		data () {
			return {
				disabled: true,
				closed: true,
				shortcuts: false,
				showFloats: this.floatingOptions
			};
		},
		computed: {
			...mapGetters({ code: "serialization" }),
			...mapState({ floatingOptions: "showFloatingOptions" })
		},
		watch: {
			showFloats (newValue, oldValue) {
				this.$store.commit(SHOW_FLOATING_OPTIONS, newValue);
			}
		}
	};
</script>

<style>
	.shortcuts [data-shortcut] {
		position:relative;
	}
	.shortcuts [data-shortcut]:after {
		content: attr(data-shortcut);
		background: var(--dark-accent);
		border: 1px solid var(--dim-accent);
		display: block;
		padding: 0.25em;
		font-size:0.5em;
		width:100%;
	}
</style>
