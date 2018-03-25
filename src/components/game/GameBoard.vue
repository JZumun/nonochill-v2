<template lang="pug">
.board-game( :style="`--board-size:${size};--clue-size:${size};`" )
	#section-clues-vertical.vertical.clue-list( @mouseleave="clearHighlight" )
		game-clue-list(
			v-for="clues, y in rules.column" :key="y"
			:vertical="true"
			:clues="clues"
			:width="size"
			:class="{solved: solved.column[y], highlighted: isHighlighted({y})}"
			@mouseenter.native="setHighlight({y})"

		)
	#section-clues-horizontal.horizontal.clue-list( @mouseleave="clearHighlight" )
		game-clue-list(
			v-for="clues, x in rules.row" :key="x"
			:clues="clues"
			:width="size"
			:class="{solved: solved.row[x], highlighted: isHighlighted({x})}"
			@mouseenter.native="setHighlight({x})"
		)
	#section-board-game.board( @mouseleave="clearHighlight", :class="{win}")
		.game-row(v-for="row,x in board" v-bind:key="x")
			game-tile(
				v-for="tile,y in row" key="`${x}-${y}`"
				:state="board[x][y]"
				:class="{highlighted: isHighlighted({x,y})}"
				@mouseenter.native="enterTile({x,y},$event)"
					@mousedown.native="setTile({x,y})"
			)
	#section-miscellaneous.misc-section
		slot
</template>

<script>
	import highlighter from "../mixins/highlighter";
	import GameTile from "./GameTile.vue";
	import GameClueList from "./GameClueList.vue";

	import { count, sameArrays, filteredLength } from "utils/ArrayUtils";
	import computedRule from "utils/game/GenerateRule";

	const sameRule = (x, y) => x.val === y.val && x.count === y.count;
	const sameRules = (a, b) => sameArrays(a, b, sameRule);

	const frozenArray = (...contents) => Object.freeze([ ...contents ]);
	export const EMPTY_GAME = Object.freeze({
		board: frozenArray( frozenArray(0) ),
		rules: Object.freeze({
			row: frozenArray(frozenArray()),
			column: frozenArray( frozenArray() )
		})
	})

	export default {
		mixins: [highlighter],
		components: { GameTile, GameClueList },
		props: {
			board: {
				type: Array,
				default: _ =>EMPTY_GAME.board
			},
			rules: {
				type: Object,
				default: _ => EMPTY_GAME.rules,
				validator: val => val.row instanceof Array && val.column instanceof Array 
			},
			activeTile: { type: Object, default: _ =>({ x:0, y:0 }) }
		},
		data() {
			return {
				highlight: {}
			}
		},
		computed: {
			size() { return this.board.length },
			rows() { return this.board },
			columns() { return count(this.size).map(col => this.board.map(row => row[col])) },
			solved () {
				return {
					row: this.rows.map((row, i) => sameRules(computedRule(row), this.rules.row[i])),
					column: this.columns.map((col, j) => sameRules(computedRule(col), this.rules.column[j]))
				}
			},
			win () {
				return (filteredLength(this.solved.column) === this.size) &&
						(filteredLength(this.solved.row) === this.size);
			}
		},
		watch: {
			win(val) { if (val) { this.$emit("win") } },
			activeTile(val) { this.setHighlight(val) }
		},
		methods: {
			enterTile(tile, e) {
				this.setHighlight(tile);
				if (e.buttons === 1) { this.setTile(tile) }
			},
			setTile(tile) {
				this.$emit("toggle", tile);
			}
		}
	}
</script>

<style>
.board-game {
	--fill-scale:0.6;
	--cross-scale:0.2;
	--board-gap:1px;
	--board-size:17;
	--clue-size:17;
	position:relative;
	display:grid;
	grid-template-rows: 1fr 2fr;
	grid-template-columns: 1fr 2fr;
	grid-gap: var(--board-gap);
	grid-template-areas:
		"corner upper-rules"
		"side-rules game"
	;
	height: 100%;
	width:100%;
	overflow:hidden;
}

.board {
	display:grid;
	grid-area: game;
	grid: repeat(var(--board-size),1fr) / 1fr;
	grid-gap:var(--board-gap);
}
.game-row {
	display:grid;
	grid: 1fr / repeat(var(--board-size),1fr);
	grid-gap:var(--board-gap);
}
.vertical.clue-list {
    grid-area:upper-rules;
    grid: 1fr / repeat(var(--board-size),1fr);
	grid-gap:var(--board-gap);
}
.horizontal.clue-list {
	grid-area:side-rules;
	grid: repeat(var(--board-size),1fr) / 1fr;
	grid-gap:var(--board-gap);
}
.clue-list {
	display:grid;
}
.win {
	--board-gap:0;
}

.game-tile.highlighted, .clues.highlighted {
	background: var(--highlight-color) ;
}

.clues.solved {
	background-color:rgba(255,255,255,0.125);
}

.misc-section {
	grid-area: corner;
	padding-right: 1em;
	padding-bottom: 1em;
}
</style>
