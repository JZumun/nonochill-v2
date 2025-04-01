<template lang="pug">
	board-container( v-hotkey="keymap" )
		game-board(
				:board="board",
				:rules="rules",
				:activeTile="activeTile"
				@toggle="toggle"
				@toggle-end="toggleEnd"
				@win="win"
				v-if="ready"
			)
			floating-options
		loading-symbol.loarding-game-symbol( v-else :display="true", size="2em", :error="errorMessage")
			template(slot="message")
				span.message {{loadingMessage}}
			template(slot="error" slot-scope="{ error }")
				div.error
					div Unable to load puzzle:
					div.error-message  {{ error }}
					router-link.link(to="/") Back to Home
</template>

<script>
	import gameKeyMap from "../mixins/gameKeyMap";
	import BoardContainer from "components/app/BoardContainer.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";
	import { ACTION_SET_TILE, ACTION_WIN_GAME } from "store/actions";

	import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [gameKeyMap],
		components: { GameBoard, FloatingOptions, LoadingSymbol, BoardContainer },
		data () {
			return { 
				ready: true,
				currentColor: null,
				loadingMessage: "Loading"
			};
		},
		computed: {
			...mapState({
				board: "board",
				rules: "rules"
			}),
			...mapGetters(["nextColor"])
		},
		methods: {
			...mapActions({ 
				set: ACTION_SET_TILE,
				win: ACTION_WIN_GAME 
			}),
			toggle(tile) {
				if (!this.currentColor) {
					this.currentColor = this.nextColor(tile.x, tile.y);
				}
				this.set({ tile, next: this.currentColor});
			},
			toggleEnd() {
				this.currentColor = null;
			}
		}
	};
</script>

<style lang=stylus scoped>
.message
	font-size 2em
	font-weight 600
	color white
.error div
	text-align center
.error-message 
	font-size 5em
	font-weight 600
	line-height 1

.link
	display block
	padding 1em
	max-width max-content
	margin auto
	margin-top 1em

</style>