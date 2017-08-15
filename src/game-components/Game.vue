<template lang="pug">
	game-board(
			:colors="colors"
			:board="board"
			:rules="rules"
			@win="win"
			:class="{disabled}"
	)
</template>

<script>
	import GameBoard from "./GameBoard.vue"
	import { deserialize, serialize } from "./utils/Serializer"
	import { random } from "../utils/RandomUtils"
	import { count, square } from "../utils/ArrayUtils"

	import { TILE_TOGGLE_EVT,
					 GAME_CLEAR_EVT, GAME_READY_EVT,
					 GAME_START_EVT, GAME_WIN_EVT, GAME_BAD_SERIAL_EVT } from "../pubsub/Events"
	import eventBus from "../pubsub/Bus"
	import computedRule from "./utils/GenerateRule"

	export default {
		components: {GameBoard},
		props: {
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				size: 0,
				colors: 1,
				board: [],
				rules: {
					column: [],
					row: []
				}
			}
		},
		computed: {
			serialization() {
				return serialize({
					width: this.size,
					height: this.size,
					colors: this.colors,
					column: this.rules.column,
					row: this.rules.row
				});
			},
		},
		watch: {
			disabled(dis) {
				if (dis) {
					this.disableListeners()
				} else {
					this.enableListeners();
				}
			}
		},
		methods: {
			win() { eventBus.$emit(GAME_WIN_EVT) },
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
					this.won = false;
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
				this.clearBoard();
				const game = square(this.size, (i,j)=> Math.random() < density ? random(1,this.colors) : 0);
				this.rules.column = count(this.size).map( col => computedRule( game.map(row=>row[col]) ) );
				this.rules.row = count(this.size).map( row => computedRule( game[row] ) );
				this.won = false;
				eventBus.$emit(GAME_READY_EVT,this.serialization);
			},
			enableListeners() {
				eventBus.$on(TILE_TOGGLE_EVT,this.setTile);
				eventBus.$on(GAME_CLEAR_EVT,this.clearBoard);
			},
			disableListeners() {
				eventBus.$off(TILE_TOGGLE_EVT,this.setTile);
				eventBus.$off(GAME_CLEAR_EVT,this.clearBoard);
			}
		},
		mounted() {
			eventBus.$on(GAME_START_EVT,this.generateGame);
			if (!this.disabled) {
				this.enableListeners();
			}
		},
	}
</script>

<style scoped>
	.disabled {
		display:none !important;
	}
</style>
