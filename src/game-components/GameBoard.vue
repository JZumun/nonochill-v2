<template lang="pug">
	.board-game( :style="`--board-size:${size};--clue-size:${clueSize};`" )
		#section-clues-vertical.vertical.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.column"
				:key="this.id"
				:id="{y:i}"
				:solved="solved.column[i]"
				:clues="clues"
				:width="clueSize"
			)
		#section-clues-horizontal.horizontal.clue-list( @mouseleave="clearHighlight" )
			game-clue-list(
				v-for="clues, i in rules.row"
				:key="this.id"
				:id="{x:i}"
				:solved="solved.row[i]"
				:clues="clues"
				:width="clueSize"
			)
		#section-board-game.board( @mouseleave="clearHighlight", :class="{win}" )
			.game-row(v-for="row,x in board" v-bind:key="x")
				game-tile(
					v-for="tile,y in row"
					:key="this.id"
					:id="{x,y}"
					:state="board[x][y]"
				)
</template>

<script>
	import { TILE_TOGGLE_EVT, TILE_HIGHLIGHT_EVT,
					 GAME_CLEAR_EVT, GAME_START_EVT, GAME_WIN_EVT } from "../pubsub/Events"
	import eventBus from "../pubsub/Bus"

	import { count, square, sameArrays } from "../utils/ArrayUtils"
	import { FILLED, TILE_STATES } from "../utils/TileStates"
	import generateRuleFromArray from "../utils/GenerateRule"

	import GameTile from "./GameTile.vue"
	import GameClueList from "./GameClueList.vue"

	const truthySize = arr => arr.filter(i=>i).length;
	const computedRule = arr => arr ? generateRuleFromArray( arr, x=>x==FILLED ) : [];
	const incrementColor = (value,max,reversed) => {
		const empty = 0;
		const crossed = -1;
		return !reversed ? value == max ? crossed : value+1
										: value == crossed ? max : value-1
	}
	const random = (min,max) => Math.floor( Math.random()*(max-min+1) ) + min
	const sameRules = (a,b) => sameArrays(a,b, (x,y)=>x.val == y.val && x.count == y.count);

	export default {
		props: {
			size: Number,
			density: Number,
			colors: Number
		},
		computed: {
			rows() { return this.board },
			columns() { return count(this.size).map( col => this.board.map(row=>row[col]) ) },
			clueSize() { return Math.ceil(this.size) },
			solved() {
				return {
					row: this.rows.map((row,i) => sameRules( computedRule(row), this.rules.row[i] )),
					column: this.columns.map((col,j) => sameRules( computedRule(col), this.rules.column[j] ))
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
				tiles: TILE_STATES,
				board: [],
				rules: {
					column: [],
					row: []
				}
			}
		},
		methods: {
			setTile({tile:{x,y},reverse}) {
				const board = this.board.slice();
				board[x][y] = incrementColor(board[x][y],this.colors,reverse);
				this.board = board;
			},
			clearBoard() {
				this.board = square(this.size, (i,j)=> 0 );
			},
			generateGame() {
				this.clearBoard();
				const game = square(this.size, (i,j)=> Math.random() < this.density ? random(1,this.colors) : 0);
				this.rules.column = count(this.size).map( col => generateRuleFromArray( game.map(row=>row[col]) ) );
				this.rules.row = count(this.size).map( row => generateRuleFromArray( game[row] ) );
			},
			clearHighlight() {
				eventBus.$emit(TILE_HIGHLIGHT_EVT,{});
			}
		},
		created() {
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
</style>
