<template lang="pug">
.board-game( :style="`--board-size:${size};--clue-size:${clueSize};--clue-ratio:${clueRatio}`" )
	#section-clues-vertical.vertical.clue-list( @mouseleave="clearHighlight" )
		game-clue-list(
			v-for="clues, y in rules.column" :key="y"
			:vertical="true"
			:clues="clues"
			:width="clueSize"
			:class="{solved: solved.column[y], highlighted: isHighlighted({y})}"
			 @mouseenter.native="setHighlight({y})"
		)
	#section-clues-horizontal.horizontal.clue-list( @mouseleave="clearHighlight" )
		game-clue-list(
			v-for="clues, x in rules.row" :key="x"
			:clues="clues"
			:width="clueSize"
			:class="{solved: solved.row[x], highlighted: isHighlighted({x})}"
			@mouseenter.native="setHighlight({x})"
		)
	#section-board-game.board( @mouseleave="clearHighlight", :class="{win}" )
		.game-row(v-for="row,x in board" v-bind:key="x" )
			game-tile(
				:data-x="x"
				:data-y="y"
				v-for="tile,y in row" 
				:key="`${x}-${y}`"
				:state="board[x][y]"
				:class="{highlighted: isHighlighted({x,y})}"
				@pointerup.native.prevent="setTileEnd()"
				@pointerenter.native="enterTile({x,y},$event)"
				@pointerdown.native.prevent="setTile({x,y}, $event)"
				@touchmove.native="preventPanning"
				@touchend.native="unHighlight"
				@contextmenu.native.prevent
			)


	#section-miscellaneous.misc-section
		slot
</template>

<script>
	import debounce from "throttle-debounce/debounce";
	import highlighter from "../mixins/highlighter";
	import GameTile from "./GameTile.vue";
	import GameClueList from "./GameClueList.vue";

	import { count, sameArrays, filteredLength } from "utils/ArrayUtils";
	import computedRule from "utils/game/GenerateRule";

	const sameRule = (x, y) => x.val === y.val && x.count === y.count;
	const sameRules = (a, b) => sameArrays(a, b, sameRule);

	const frozenArray = (...contents) => Object.freeze([...contents]);
	export const EMPTY_GAME = Object.freeze({
		board: frozenArray(frozenArray(0)),
		rules: Object.freeze({
			row: frozenArray(frozenArray()),
			column: frozenArray(frozenArray())
		})
	});

	export default {
		mixins: [highlighter],
		components: { GameTile, GameClueList },
		props: {
			board: {
				type: Array,
				default: _ => EMPTY_GAME.board
			},
			rules: {
				type: Object,
				default: _ => EMPTY_GAME.rules,
				validator: val => val.row instanceof Array && val.column instanceof Array
			},
			activeTile: { type: Object, default: _ => ({ x: 0, y: 0 }) }
		},
		data () {
			return {
				highlight: {},
				solved: {
					row: [],
					column: []
				},
				win: false,
				currentlyTouched: { x: null, y: null }
			};
		},
		computed: {
			size () { return this.board.length; },
			clueSize() {
				return Math.max(...this.rules.row.map(c => c.length),	...this.rules.column.map(c => c.length), Math.floor(this.size/2));
			},
			clueRatio() { return this.clueSize / this.size; },
			rows () { return this.board; },
			columns () { return count(this.size).map(col => this.board.map(row => row[col])); },

		},
		watch: {
			win (val) { if (val) { this.$emit("win"); } },
			activeTile (val) { this.setHighlight(val); },
			board: debounce(200, function (val) {
				this.solved = this.computeSolved();
				this.win = this.computeWin();
			})
		},
		methods: {
			computeSolved () {
				return {
					row: this.rows.map((row, i) => sameRules(computedRule(row), this.rules.row[i])),
					column: this.columns.map((col, j) => sameRules(computedRule(col), this.rules.column[j]))
				};
			},
			computeWin () {
				return (filteredLength(this.solved.column) === this.size) &&
						(filteredLength(this.solved.row) === this.size);
			},
			enterTile (tile, e) {
				this.setHighlight(tile);
				if (e.buttons === 1 || e.buttons === 2) { this.setTile(tile, e); }
			},
			setTile(tile, e) {
				this.$emit("toggle", tile, e.buttons===2);
				e.target.releasePointerCapture(e.pointerId)
			},
			setTileEnd() {
				this.$emit("toggle-end");
			},
			preventPanning(e) {
				if (e.touches.length == 1) {
					e.preventDefault();
				}
			},
			unHighlight() {
				setTimeout(() => this.clearHighlight(), 250);
			}
		},
		created () {
			this.solved = this.computeSolved();
			this.win = this.computeWin();
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"
	.board-game
		--board-size 17
		--clue-size 17
		--grid-gap 1px
		--grid-gap-color $gray-accent
		--grid-gap-hightlight $light-accent 
		position relative
		display grid
		// grid-template-rows  1fr calc(1fr/var(--clue-ratio))
		// grid-template-columns 1fr calc(1fr/var(--clue-ratio))
		grid-template-rows 1fr 2fr
		grid-template-columns 1fr 2fr
		grid-template-areas  "corner upper-rules" "side-rules game"
		width 100%
		overflow hidden
		-webkit-user-select  none
		-moz-user-select  none
		-ms-user-select  none
		user-select  none
	
	.clue-list
	.board
		background-color white

	// BORDERS
	.clue-list
	.clues
	.game-row
	.game-tile
		border-color  var(--grid-gap-color)
		border-style solid
		border-width 0
	
	.vertical.clue-list
		border-bottom-width: var(--grid-gap)
	.horizontal.clue-list
		border-right-width: var(--grid-gap)
	.vertical .clues + .clues
		border-left-width: var(--grid-gap)
	.horizontal .clues + .clues
		border-top-width var(--grid-gap)
	.game-row + .game-row
		border-top-width var(--grid-gap)
	.game-tile + .game-tile
		border-left-width var(--grid-gap)
	
	.clue-list
	.clues:nth-child(5n+6)
	.game-row:nth-child(5n+6)
	.game-tile:nth-child(5n+6)
		border-color var(--grid-gap-hightlight)


	.board
		display grid
		grid-area  game
		grid  repeat(var(--board-size),1fr) \/ 1fr
		cursor  pointer
		touch-action pinch-zoom

	.game-row
		display grid
		grid  1fr \/ repeat(var(--board-size),1fr)

	.vertical.clue-list
		grid-area upper-rules
		grid  1fr \/ repeat(var(--board-size),1fr)

	.horizontal.clue-list
		grid-area side-rules
		grid  repeat(var(--board-size),1fr) \/ 1fr

	.clue-list
		display grid

	.win
		--board-gap 0
		--grid-gap 0


	.game-tile, .clues
		will-change  background


	.clues
		// transition background-color 0.1s
	.clues.solved
		background-color $gray-accent
		opacity: 0.5
	.clues.solved.highlighted
		opacity: 0.6

	.game-tile.highlighted, .clues.highlighted		
		background  $highlight-color



	.misc-section
		grid-area  corner
		padding-right  0.5em
		padding-bottom  0.5em

</style>
