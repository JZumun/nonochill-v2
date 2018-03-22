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
				input(type="checkbox" :value="showFloatingOptions", @change="toggleFloatingOptions($event.target.checked)")
				| Toggle Floating Options
</template>

<script>
	import ShareGame from "./options/ShareGame.vue";
	import SaveGame from "./options/SaveGame.vue";
	import ColorScheme from "./options/ColorScheme.vue";
	import GameHistory from "./options/GameHistory.vue";

	import { SHOW_FLOATING_OPTIONS } from "store/modules/floatingOptions";
	import { mapState, mapMutations } from "vuex";

	export default {
		components: { GameHistory, ColorScheme, SaveGame, ShareGame },
		data () {
			return {
				disabled: true,
				closed: true,
				shortcuts: false
			};
		},
		computed: {
			...mapState({
				showFloatingOptions: state => state.floatingOptions.show
			})
		},
		methods: {
			...mapMutations({
				toggleFloatingOptions: SHOW_FLOATING_OPTIONS
			})
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
