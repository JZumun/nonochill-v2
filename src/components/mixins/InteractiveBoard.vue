<template lang="pug">
	board-container( v-hotkey="keymap" )
		game-board(
				:board="board",
				:rules="rules",
				:activeTile="activeTile"
				@toggle="toggle"
				@win="win"
				v-if="ready"
			)
			floating-options
		loading-symbol.loarding-game-symbol( v-else :display="true", size="2em", :error="errorMessage")
</template>

<script>
	import gameKeyMap from "../mixins/gameKeyMap";
	import BoardContainer from "components/app/BoardContainer.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";
	import { ACTION_TOGGLE_TILE, ACTION_WIN_GAME } from "store/actions";

	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [gameKeyMap],
		components: { GameBoard, FloatingOptions, LoadingSymbol, BoardContainer },
		data () {
			return { ready: true };
		},
		computed: {
			...mapState({
				board: "board",
				rules: "rules"
			})
		},
		methods: {
			...mapActions({ toggle: ACTION_TOGGLE_TILE, win: ACTION_WIN_GAME })
		}
	};
</script>