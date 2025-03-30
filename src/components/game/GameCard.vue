<template lang="pug">
	.game-card(v-if="empty")
		game-board.game-card-board
		dl.game-card-details
			dt &nbsp;
			dd &nbsp;
			dt &nbsp;
			dd &nbsp;
		.game-card-id &nbsp;
	.game-card(v-else)
		game-board.game-card-board(
				:board="generateBoard(width, colors)"
				:style="generateStyle(colorScheme)"
		)
		dl.game-card-details
			dt Size
			dd(v-text="width")
			dt Colors
			dd(v-text="colors")
		.game-card-id(v-text="cardName")
</template>

<script>
	import GameBoard from "components/game/MiniBoard.vue";
	import generateGame from "utils/game/GenerateGame";

	export default {
		components: { GameBoard },
		props: {
			width: { type: Number, default: 1 },
			colors: { type: Number, default: 1 },
			colorScheme: { type: Array, default () { return []; } },
			id: { type: String, default: null },
			empty: { type: Boolean, default: false },
			label: { type: String, default: null }
		},
		computed: {
			cardName () { return this.label || `Puzzle #${this.id.substr(0, 6)}`; }
		},
		methods: {
			generateBoard (width, colors) {
				const size = Math.min(Math.ceil((width + 1) / 5), 4);
				return generateGame(size, colors, 0.8);
			},
			generateStyle (scheme) {
				return scheme ? scheme.reduce((mem, curr, i) => mem + `--state-${i + 1}: ${curr}; `, "") : "";
			}
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"
		
	.game-card 
		color $dim-accent
		display block
		width 100%
		background-color rgba(255,255,255,0.5)
		padding 1em

	.board-game.game-card-board 
		width 100%


	dl.game-card-details 
		display grid
		grid-template-columns auto auto
		grid-gap 1px
		margin 1px 0
		font-weight 600

	.game-card-details > * 
		padding 0.25em
		background-color white
		text-align right
		font-size 0.75em

	.game-card-details dd  
		margin 0 
	.game-card-details dt 
		margin 0
		background rgba(255,255,255,0.5)
		grid-row 1
		font-size 0.5em

	.game-card-id 
		font-size 0.75em
		background-color $dark-accent
		color $translucent-white
		padding 0.5em
		text-align center

</style>
