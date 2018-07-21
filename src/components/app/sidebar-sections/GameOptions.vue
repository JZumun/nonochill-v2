<template lang="pug">
	#game-options
		save-game
		color-scheme
		game-history
		share-game
		fieldset
			legend Other
			label
				input(type="checkbox" :checked="showShortcut", @change="toggleShortcut($event.target.checked)")
				| Toggle Shortcut Guide
			br
			label
				input(type="checkbox" :checked="showFloatingOptions", @change="toggleFloatingOptions($event.target.checked)")
				| Toggle Floating Options
		sound-options
</template>

<script>
	import ShareGame from "./options/ShareGame.vue";
	import SaveGame from "./options/SaveGame.vue";
	import ColorScheme from "./options/ColorScheme.vue";
	import GameHistory from "./options/GameHistory.vue";
	import SoundOptions from "./options/SoundOptions.vue";

	import { mapState, mapMutations } from "vuex";

	export default {
		components: { GameHistory, ColorScheme, SaveGame, ShareGame, SoundOptions },
		data () {
			return {
				disabled: true,
				closed: true
			};
		},
		computed: {
			...mapState({
				showFloatingOptions: state => state.accessibility.floatingOptions.show,
				showShortcut: state => state.accessibility.shortcut.show
			})
		},
		methods: {
			...mapMutations({
				toggleFloatingOptions: "accessibility/floatingOptions/toggle",
				toggleShortcut: "accessibility/shortcut/toggle"
			})
		}
	};
</script>