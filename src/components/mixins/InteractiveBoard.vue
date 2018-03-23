<template lang="pug">
.main-game-board( v-hotkey="keymap" )
	game-board(
			:board="board",
			:rules="rules",
			:activeTile="activeTile"
			@toggle="toggle"
			v-if="ready"
		)
		floating-options
	game-board(v-else)
		loading-symbol.loarding-game-symbol( :display="true", size="2em")
</template>

<script>
	import gameKeyMap from "../mixins/gameKeyMap";
	import GameBoard from "components/game/GameBoard.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";

	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [gameKeyMap],
		components: { GameBoard, FloatingOptions, LoadingSymbol },
		data() {
			return { ready: false }
		},
		computed: {
			...mapState({
				board: "board",
				rules: "rules"
			}),
		},
		methods: {
			...mapActions({toggle: "action:toggle-tile"})
		}
	}
</script>

<style>
	.loading-symbol-container.loarding-game-symbol {
    position: absolute;
    top: 66.66%;
    left: 66.66%;
    Z-INDEX: 2;
    margin-top: -1em;
    margin-left: -1em;
	}
</style>
