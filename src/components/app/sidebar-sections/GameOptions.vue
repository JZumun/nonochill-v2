<template lang="pug">
	#game-options( :class="{shortcuts}" )
		save-game
		color-scheme
		game-history
		share-game
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
	import ShareGame from "./ShareGame.vue";
	import SaveGame from "./SaveGame.vue";
	import ColorScheme from "./ColorScheme.vue";
	import GameHistory from "./GameHistory.vue";

	import { SHOW_FLOATING_OPTIONS } from "store/mutations";
	import { mapState } from "vuex";

	export default {
		components: { GameHistory, ColorScheme, SaveGame, ShareGame },
		data () {
			return {
				disabled: true,
				closed: true,
				shortcuts: false,
				showFloats: this.floatingOptions
			};
		},
		computed: {
			...mapState({
				floatingOptions: "showFloatingOptions"
			})
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
