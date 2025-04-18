<template lang="pug">
	#game-options
		save-game(v-if="inGame || inEditor")
		color-scheme
		game-history
		share-game(v-if="inGame || inEditor")
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
		game-solver(v-if="inGame")
</template>

<script>
	import ShareGame from "./options/ShareGame.vue";
	import SaveGame from "./options/SaveGame.vue";
	import ColorScheme from "./options/ColorScheme.vue";
	import GameHistory from "./options/GameHistory.vue";
	import SoundOptions from "./options/SoundOptions.vue";
	import GameSolver from "../../solver/Solver.vue"

	import { mapState, mapMutations } from "vuex";

	export default {
		components: { GameHistory, ColorScheme, SaveGame, ShareGame, SoundOptions, GameSolver },
		data () {
			return {
				disabled: true,
				closed: true
			};
		},
		computed: {
			...mapState({
				showFloatingOptions: state => state.accessibility.floatingOptions.show ? true : null,
				showShortcut: state => state.accessibility.shortcut.show ? true : null
			}),
			inGame() {
				return this.$route.path.startsWith("/game");
			},
			inEditor() {
				return this.$route.path.startsWith("/editor");
			}
		},
		methods: {
			...mapMutations({
				toggleFloatingOptions: "accessibility/floatingOptions/toggle",
				toggleShortcut: "accessibility/shortcut/toggle"
			})
		}
	};
</script>