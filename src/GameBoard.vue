<template lang="pug">
	.board-game(
		v-bind:style="`--board-size:${size};--clue-size:${clueSize};`"
	)
		#section-clues-vertical.vertical.clue-list
			game-clue-list(
				v-for="clues, i in rules.column"
				v-bind:key="i"
				v-bind:highlight="highlight[1]===i"
				v-bind:solved="solved.column[i]"
				v-bind:clues="clues"
				v-bind:width="clueSize"
			)
		#section-clues-horizontal.horizontal.clue-list
			game-clue-list(
				v-for="clues, i in rules.row"
				v-bind:key="i"
				v-bind:highlight="highlight[0]===i"
				v-bind:solved="solved.row[i]"
				v-bind:clues="clues"
				v-bind:width="clueSize"
			)
		#section-board-game.board( @mouseleave="setHighlight({})" )
			.game-row(v-for="row,x in board" v-bind:key="x")
				game-tile(
					v-for="tile,y in row"
					v-bind:key="y"
					v-bind:id="{x,y}"
					v-bind:state="board[x][y]"
					v-bind:highlight="highlight[0]===x || highlight[1]===y"
				)
</template>

<script>
	import { TILE_HIGHLIGHT_EVT, TILE_TOGGLE_EVT,
					 GAME_CLEAR_EVT, GAME_START_EVT, GAME_WIN_EVT } from "./pubsub/Events"
	import eventBus from "./pubsub/Bus"

	import { count, square, sameArrays } from "./utils/ArrayUtils"
	import { FILLED, TILE_STATES, getNextState } from "./utils/TileStates"
	import generateRuleFromArray from "./utils/GenerateRule"

	import GameTile from "./GameTile.vue"
	import GameClueList from "./GameClueList.vue"

	const truthySize = arr => arr.filter(i=>i).length;
	const computedRule = arr => arr ? generateRuleFromArray( arr, x=>x==FILLED ) : [];

	export default {
		props: {
			size: Number,
			density: Number
		},
		computed: {
			rows() { return this.board },
			columns() { return count(this.size).map( col => this.board.map(row=>row[col]) ) },
			clueSize() { return Math.ceil(this.size/2) },
			solved() {
				return {
					row: this.rows.map((row,i) => sameArrays( computedRule(row), this.rules.row[i] )),
					column: this.columns.map((col,j) => sameArrays( computedRule(col), this.rules.column[j] ))
				}
			},
			win() {
				return (truthySize(this.solved.column) == this.size) &&
					(truthySize(this.solved.row) == this.size)
			}
		},
		watch: {
			win(val) { if(val) eventBus.$emit(GAME_WIN_EVT) }
		},
		data() {
			return {
				highlight: [],
				board: [],
				rules: {
					column: [],
					row: []
				}
			}
		},
		methods: {
			setHighlight({x,y}) { this.highlight = [x,y] },
			setTile({tile:{x,y},reverse}) {
				const board = this.board.slice();
				board[x][y] = getNextState(this.board[x][y],reverse);
				this.board = board;
			},
			clearBoard() {
				this.board = square(this.size, (i,j)=> TILE_STATES[0] );
			},
			generateGame() {
				this.clearBoard();
				const game = square(this.size, (i,j)=> Math.random() < this.density ? 1 : 0);
				//
				this.rules.column = count(this.size).map( col => generateRuleFromArray( game.map(row=>row[col]) ) );
				this.rules.row = count(this.size).map( row => generateRuleFromArray( game[row] ) );
			}
		},
		created() {
			eventBus.$on(TILE_HIGHLIGHT_EVT,this.setHighlight);
			eventBus.$on(TILE_TOGGLE_EVT,this.setTile);
			eventBus.$on(GAME_CLEAR_EVT,this.clearBoard);
			eventBus.$on(GAME_START_EVT,this.generateGame);

			this.generateGame();
		},
		components: {
			GameTile, GameClueList
		}
	}
</script>

<style>
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
.empty {
	--board-width:2;
	--board-height:2;
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
</style>
