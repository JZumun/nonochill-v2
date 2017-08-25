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
					@mousedown.native="toggle({x,y})"
				)
</template>

<script>
	import GameTile from "./GameTile.vue";
	import GameClueList from "./GameClueList.vue";

	import { mapState, mapActions } from "vuex";
	import { ACTION_TOGGLE_TILE } from "store/actions";

import { count, sameArrays, filteredLength } from "utils/ArrayUtils";
	import computedRule from "utils/game/GenerateRule";

	const equalAndValued = (a, b) => a != null && a === b;
const sameRule = (x, y) => x.val === y.val && x.count === y.count;
const sameRules = (a, b) => sameArrays(a, b, sameRule);

export default {
		components: { GameTile, GameClueList },
		data () {
			return {
				highlight: {}
			};
		},
		computed: Object.assign({
			solved () {
				return {
					row: this.rows.map((row, i) => sameRules(computedRule(row), this.rules.row[i])),
					column: this.columns.map((col, j) => sameRules(computedRule(col), this.rules.column[j]))
				};
			},
			win () {
				return (filteredLength(this.solved.column) === this.size) &&
						(filteredLength(this.solved.row) === this.size);
			}
		}, mapState({
			board: "board",
			rules: "rules",
			size: ({ board }) => board.length,
			rows: "board",
			columns: ({ board }) => count(board.length).map(col => board.map(row => row[col]))
		})),
		watch: {
			win (val) { if (val) this.$emit("win"); }
		},
		methods: Object.assign({
			clearHighlight () { this.highlight = {}; },
			setHighlight (tile) { this.highlight = tile; },
			isHighlighted ({ x, y }) {
				return equalAndValued(this.highlight.x, x) ||
																	equalAndValued(this.highlight.y, y);
			},

			enterTile (tile, e) {
				this.setHighlight(tile);
				if (e.buttons === 1) { this.toggle(tile); }
			}
		}, mapActions({
			toggle: ACTION_TOGGLE_TILE
		}))
	};
</script>

<style scoped>
.board-game {
	--board-gap:1px;
	--board-size:1;
	--clue-size:1;
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
</style>
