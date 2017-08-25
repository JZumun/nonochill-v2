<template lang="pug">
	.board-game( :style="`--board-size:${size};--clue-size:${size};`" )
		#section-clues-vertical.vertical.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.column" :key="i"
				:vertical="true"
				:clues="clues"
				:width="size"
				:class="{solved: solved.column[i], highlighted: isHighlighted(null,i)}"
				@mouseenter.native="setHighlight(null,i)"

			)
		#section-clues-horizontal.horizontal.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.row" :key="i"
				:clues="clues"
				:width="size"
				:class="{solved: solved.row[i], highlighted: isHighlighted(i,null)}"
				@mouseenter.native="setHighlight(i,null)"
			)
		#section-board-game.board( @mouseleave="clearHighlight", :class="{win}")
			.game-row(v-for="row,x in board" v-bind:key="x")
				game-tile(
					v-for="tile,y in row" key="`${x}-${y}`"
					:state="board[x][y]"
					:class="{highlighted: isHighlighted(x,y)}"
					@mouseenter.native="enterTile(x,y,$event)"
					@mousedown.native="toggle(x,y)"
				)
</template>

<script>
	import GameTile from "./GameTile.vue"
	import GameClueList from "./GameClueList.vue"


	import { ACTION_TOGGLE_TILE } from "store/actions";

	import { count, sameArrays, filteredLength } from "utils/ArrayUtils"
	import computedRule from "utils/game/GenerateRule"

	const equalAndValued = (a,b) => a != null && a === b;
	const sameRule = (x,y) => x.val == y.val && x.count == y.count;
	const sameRules = (a,b) => sameArrays(a,b, sameRule);

	export default {
		components: {GameTile, GameClueList},
		data() {
			return {
				highlight: {}
			}
		},
		computed: {
			colors() { return this.$store.state.colorNum },
			board() { return this.$store.state.board },
			rules() { return this.$store.state.rules },
			rows() { return this.board },
			columns() { return count(this.size).map( col => this.board.map(row=>row[col]) ) },
			size() { return this.board.length; },
			solved() {
				return {
					row: this.rows.map((row,i) => sameRules( computedRule(row), this.rules.row[i] )),
					column: this.columns.map((col,j) => sameRules( computedRule(col), this.rules.column[j] ))
				}
			},
			win() {
				return (filteredLength(this.solved.column) == this.size) &&
					(filteredLength(this.solved.row) == this.size)
			},
		},
		watch: {
			win(val) { if(val) this.$emit("win") }
		},
		methods: {
			clearHighlight() { this.highlight = {} },
			setHighlight(x,y) { this.highlight = {x,y} },
			isHighlighted(x,y) { return equalAndValued(this.highlight.x,x) ||
																	equalAndValued(this.highlight.y,y) },

			enterTile(x,y,e) {
				this.setHighlight(x,y);
				if (e.buttons == 1) { this.toggle(x,y) }
			},
			toggle(x,y) {
				this.$store.dispatch(ACTION_TOGGLE_TILE, {
					tile: {x,y},
					curr: this.board[x][y]
				});
			}
		}
	}
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
