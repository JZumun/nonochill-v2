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
	loading-symbol.loarding-game-symbol( v-else slot="contents" :display="true", size="2em", :error="errorMessage")
</template>

<script>
	import gameKeyMap from "../mixins/gameKeyMap";
	import GameBoard from "components/game/GameBoard.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";
	import { ACTION_TOGGLE_TILE } from "store/actions";

	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [gameKeyMap],
		components: { GameBoard, FloatingOptions, LoadingSymbol },
		data() {
			return { ready: true }
		},
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
