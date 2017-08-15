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
					:max-state="colors"
				)
</template>

<script>
	import { TILE_TOGGLE_EVT, TILE_HIGHLIGHT_EVT,
					 GAME_CLEAR_EVT, GAME_READY_EVT,
					 GAME_START_EVT, GAME_WIN_EVT, GAME_BAD_SERIAL_EVT } from "../pubsub/Events"
	import eventBus from "../pubsub/Bus"

	import { random } from "../utils/RandomUtils"
	import { count, square, sameArrays, filteredLength } from "../utils/ArrayUtils"
	import { deserialize, serialize } from "./utils/Serializer"
	import computedRule from "./utils/GenerateRule"

	import GameTile from "./GameTile.vue"
	import GameClueList from "./GameClueList.vue"

	const sameRule = (x,y) => x.val == y.val && x.count == y.count;
	const sameRules = (a,b) => sameArrays(a,b, sameRule);

	export default {
		computed: {
			serialization() { return serialize({
				width: this.size,
				height: this.size,
				column: this.rules.column,
				row: this.rules.row
			}) },
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
				return (filteredLength(this.solved.column) == this.size) &&
					(filteredLength(this.solved.row) == this.size)
			}
		},
		watch: {
			win(val) { if(val) eventBus.$emit(GAME_WIN_EVT) }
		},
		data() {
			return {
				size: 0,
				colors: 1,
				density: 0.6,
				board: [],
				rules: {
					column: [],
					row: []
				}
			}
		},
		methods: {
			setTile({tile:{x,y},next}) {
				const board = this.board.slice();
				board[x][y] = next;
				this.board = board;
			},
			clearBoard() {
				this.board = square(this.size, (i,j)=> 0 );
			},
			loadGameFromCode(code) {
				if (!code || code.length < 1) {
					return eventBus.$emit(GAME_BAD_SERIAL_EVT,"EMPTY CODE");
				}
				try {
					const options = deserialize(code);

					this.size = options.width;
					this.colors = options.colors;
					this.rules = {}
					this.rules.column = options.column,
					this.rules.row = options.row
				} catch(e) {
					return eventBus.$emit(GAME_BAD_SERIAL_EVT,"BAD CODE");
				}

				this.clearBoard();
				eventBus.$emit(GAME_READY_EVT,this.serialization);
			},
			generateGame({size=0,colors=0,density=0,code}) {
				if (code) {
					return this.loadGameFromCode(code)
				}
				this.size = size;
				this.colors = colors;
				this.density = density;
				this.clearBoard();
				const game = square(this.size, (i,j)=> Math.random() < this.density ? random(1,this.colors) : 0);
				this.rules.column = count(this.size).map( col => computedRule( game.map(row=>row[col]) ) );
				this.rules.row = count(this.size).map( row => computedRule( game[row] ) );

				eventBus.$emit(GAME_READY_EVT,this.serialization);
			},
			clearHighlight() {
				eventBus.$emit(TILE_HIGHLIGHT_EVT,{});
			}
		},
		created() {
			eventBus.$on(TILE_TOGGLE_EVT,this.setTile);
			eventBus.$on(GAME_CLEAR_EVT,this.clearBoard);
			eventBus.$on(GAME_START_EVT,this.generateGame);
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
.win {
	--board-gap:0;
}
</style>
