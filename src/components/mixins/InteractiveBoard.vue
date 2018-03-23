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
	loading-symbol(v-else, :display="true")
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
