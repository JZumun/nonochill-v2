<template lang="pug">
.main-game-board( v-hotkey="keymap" )
	game-board(
			:board="board",
			:rules="rules",
			:activeTile="activeTile"
			@toggle="toggle"
		)
		floating-options
</template>

<script>
	import gameKeyMap from "../mixins/gameKeyMap";
	import GameBoard from "components/game/GameBoard.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";

	import { mapState, mapActions, mapMutations } from "vuex";
	import {ACTION_TOGGLE_TILE} from "store/actions";

	export default {
		mixins: [gameKeyMap],
		components: { GameBoard, FloatingOptions },
		computed: {
			...mapState({
				board: "board",
				rules: "rules"
			}),
		},
		methods: {
			...mapActions({toggle: ACTION_TOGGLE_TILE})
		}
	}
</script>
