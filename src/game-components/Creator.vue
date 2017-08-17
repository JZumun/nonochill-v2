<template lang="pug">
	game-board(
			:colors="colors"
			:board="board"
			:rules="rules"
			:class="{disabled}"
		)
</template>

<script>
	import { count, square } from "../utils/ArrayUtils"
	import GameBoard from "./GameBoard.vue"

	import { TILE_TOGGLE_EVT,
					 GAME_CLEAR_EVT, GAME_READY_EVT,
					 CREATOR_START_EVT, GAME_WIN_EVT, GAME_BAD_SERIAL_EVT } from "../pubsub/Events"
	import eventBus from "../pubsub/Bus"
	import computedRule from "./utils/GenerateRule"
	import { deserialize, serialize } from "./utils/Serializer"

	const sameRule = (x,y) => x.val == y.val && x.count == y.count;
	const sameRules = (a,b) => sameArrays(a,b, sameRule);
	export default {
		components: {GameBoard},
		props: {
			disabled: {
				default: true
			}
		},
		data() {
			const size = 5;
			return {
				size,
				colors: 1,
				board: square(size,_=>0),
				// rules: {
				// 	row: count(size).map(i=>[]),
				// 	column: count(size).map(i=>[])
				// }
			}
		},
		computed: {
			rows() { return this.board },
			columns() { return count(this.size).map( col => this.board.map(row=>row[col]) ) },
			rules() {
				return {
					row: this.rows.map((row,i) => computedRule(row)),
					column: this.columns.map((col,j) => computedRule(col))
				}
			},
			serialization() {
				try {
					return serialize({
						width: this.size,
						height: this.size,
						colors: this.colors,
						column: this.rules.column,
						row: this.rules.row
					});
				} catch(e) {
					console.error(e);
					return "";
				}

			},
		},
		watch: {
			disabled(dis) {
				if (dis) {
					this.disableListeners()
				} else {
					this.enableListeners();
				}
			},
			serialization(val) {
				eventBus.$emit(GAME_READY_EVT,val);
			}
		},
		methods: {
			setTile({tile:{x,y},next}) {
				const board = this.board.slice();
				board[x][y] = next < 0 ? 0 : next;
				this.board = board;
			},
			clearBoard() {
				this.board = square(this.size, (i,j)=> 0 );
			},
			createBoard({size, colors}) {
				this.size = size;
				this.colors = colors;
				this.board = square(size,_=>0);

				eventBus.$emit(GAME_READY_EVT,"");
			},
			enableListeners() {
				eventBus.$on(TILE_TOGGLE_EVT,this.setTile);
				eventBus.$on(GAME_CLEAR_EVT,this.clearBoard);
			},
			disableListeners() {
				eventBus.$off(TILE_TOGGLE_EVT,this.setTile);
				eventBus.$off(GAME_CLEAR_EVT,this.clearBoard);
			},
		},
		mounted() {
			eventBus.$on(CREATOR_START_EVT,this.createBoard);
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
