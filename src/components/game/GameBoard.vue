<template lang="pug">
	.board-game( :style="`--board-size:${size};--clue-size:${size};`" v-hotkey="keymap" )
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

	import { mapState, mapActions, mapMutations } from "vuex";
	import {
		ACTION_TOGGLE_TILE,
		ACTION_UNDO_MOVE,
		ACTION_REDO_MOVE,
		ACTION_ANCHOR_COLOR,
		ACTION_REVERSE_COLOR
	} from "store/actions";
	import { RESET_BOARD } from "store/mutations";

	import { count, sameArrays, filteredLength } from "utils/ArrayUtils";
	import computedRule from "utils/game/GenerateRule";

	const sameRule = (x, y) => x.val === y.val && x.count === y.count;
	const sameRules = (a, b) => sameArrays(a, b, sameRule);

	const preventDefault = fn => e => {
		e.preventDefault();
		fn(e);
	};
	const assignTo = (map = {}, thing) => el => {
		map[el] = thing;
	};

	export default {
		mixins: [highlighter],
		components: { GameTile, GameClueList },
		data () {
			return {
				highlight: {},
				activeTile: { x: 0, y: 0 }
			};
		},
		computed: {
			keymap () {
				const map = {
					"`": {
						keydown: e => this.reverseColor(true),
						keyup: e => this.reverseColor(false)
					},
					up: e => this.moveActiveTile({ dx: -1 }),
					down: e => this.moveActiveTile({ dx: 1 }),
					left: e => this.moveActiveTile({ dy: -1 }),
					right: e => this.moveActiveTile({ dy: 1 }),
					enter: e => this.toggle(this.activeTile)
				};
				[1, 2, 3, 4, 5].forEach(assignTo(map, {
					keydown: e => this.anchorColor(e.keyCode - 48),
					keyup: e => this.anchorColor(null)
				}));
				["ctrl+z", "meta+z"].forEach(assignTo(map, preventDefault(this.undo)));
				["ctrl+shift+z", "meta+shift+z"].forEach(assignTo(map, preventDefault(this.redo)));

				return map;
			},
			solved () {
				return {
					row: this.rows.map((row, i) => sameRules(computedRule(row), this.rules.row[i])),
					column: this.columns.map((col, j) => sameRules(computedRule(col), this.rules.column[j]))
				};
			},
			win () {
				return (filteredLength(this.solved.column) === this.size) &&
						(filteredLength(this.solved.row) === this.size);
			},
			...mapState({
				board: "board",
				rules: "rules",
				size: ({ board }) => board.length,
				rows: "board",
				columns: ({ board }) => count(board.length).map(col => board.map(row => row[col]))
			})
		},
		watch: {
			win (val) {
				if (val) this.$emit("win");
			},
			activeTile (val) {
				this.setHighlight(val);
			}
		},
		methods: {
			enterTile (tile, e) {
				this.setHighlight(tile);
				if (e.buttons === 1) {
					this.setTile(tile);
				}
			},
			moveActiveTile ({ dx = 0, dy = 0 } = 0) {
				const size = this.board.length;
				const x = Math.max(0, Math.min(size - 1, this.activeTile.x + dx));
				const y = Math.max(0, Math.min(size - 1, this.activeTile.y + dy));

				this.activeTile = { x, y };
			},
			setTile (tile) {
				this.activeTile = tile;
				this.toggle(tile);
			},
			...mapActions({
				toggle: ACTION_TOGGLE_TILE,
				undo: ACTION_UNDO_MOVE,
				redo: ACTION_REDO_MOVE,
				anchorColor: ACTION_ANCHOR_COLOR,
				reverseColor: ACTION_REVERSE_COLOR
			}),
			...mapMutations({
				clear: RESET_BOARD
			})
		}
	};
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
