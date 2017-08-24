<template lang="pug">
	.board-game( :style="`--board-size:${size};--clue-size:${size};`" )
		#section-clues-vertical.vertical.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.column" :key="this.id"
				:id="{y:i}"
				:clues="clues"
				:width="size"
				:class="{solved: solved.column[i], highlighted: i==highlight.y}"
				@mouseenter.native="setHighlight(null,i)"

			)
		#section-clues-horizontal.horizontal.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.row" :key="this.id"
				:id="{x:i}"
				:clues="clues"
				:width="size"
				:class="{solved: solved.row[i], highlighted: i==highlight.x}"
				@mouseenter.native="setHighlight(i,null)"
			)
		#section-board-game.board( @mouseleave="clearHighlight", :class="{win}")
			.game-row(v-for="row,x in board" v-bind:key="x")
				game-tile(
					v-for="tile,y in row"
					:key="this.id"
					:id="{x,y}"
					:state="board[x][y]"
					:max-state="colors"
					:class="{highlighted: highlight.x == x || highlight.y == y}"
					@mouseenter.native="setHighlight(x,y)"
				)
</template>

<script>
	import GameTile from "./GameTile.vue"
	import GameClueList from "./GameClueList.vue"

	import { count, sameArrays, filteredLength } from "utils/ArrayUtils"
	import computedRule from "utils/game/GenerateRule"
	const sameRule = (x,y) => x.val == y.val && x.count == y.count;
	const sameRules = (a,b) => sameArrays(a,b, sameRule);

	export default {
		components: {GameTile, GameClueList},
		props: {
			colors: Number,
			board: Array,
			rules: Object
		},
		data() {
			return {
				highlight: {}
			}
		},
		computed: {
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
			setHighlight(x,y) { this.highlight = {x,y} }
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
.clues.solved {
	background-color:rgba(255,255,255,0.125);
}

.highlighted {
	background: var(--highlight-color) !important;
}
</style>
