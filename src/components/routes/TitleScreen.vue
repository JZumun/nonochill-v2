<template lang="pug">
	section.title-screen.main-game-board
		.title-screen-header
			h1.title-screen-title NonoChill#[sup v.2]
			p.title-screen-tag-line A Nonogram puzzle game written in Vue.
		.puzzle-list
			h2 Recent Community Puzzles
			loading-symbol(v-if="loading || error", :display="loading", :error="errorMessage")
			div.game-list(v-else)
				router-link.game-item(v-for="game in games" v-if="game && game.id" key="game" :to="`/game/${game.id}`")
					game-board.game-item-board(
						:board="generateBoard(game.width, game.colors)"
						:style="generateStyle(game.colorScheme)"
						simple
					)
					dl.game-item-details
						dt Size
						dd(v-text="game.width")
						dt Colors
						dd(v-text="game.colors")
					.game-item-id(v-text="game.id")
</template>

<script>
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import generateGame from "utils/game/GenerateGame";

	import { mapState, mapActions } from "vuex";
	import { ACTION_LOAD_PUZZLE_LIST } from "store/modules/puzzleList";
	export default {
		components: {GameBoard, LoadingSymbol},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				games: state => state.puzzles.puzzles,
				loading: state => state.puzzles.loading,
				error: state => state.puzzles.error
			}),
			errorMessage() { return this.error && "Unable to load puzzle list" }
	},
		methods: {
			...mapActions({ load: ACTION_LOAD_PUZZLE_LIST }),
			generateBoard(width, colors) {
				const size = Math.min(Math.ceil((width+1) / 5), 4);
				return generateGame(size, colors, 0.8);
			},
			generateStyle(scheme) {
					return scheme ? scheme.reduce((mem, curr, i) => mem + `--state-${i+1}: ${curr}; `,'') : "";
			}
		},
		mounted() {
			this.load();
		}
	}
</script>

<style>
	.title-screen {
		grid-template-rows: auto 1fr;
		color: var(--dim-accent);
		font-size: 2vmin;
		background: var(--translucent-white);
		padding: 2em;
		margin: 2em;
		overflow-y: auto;
	}
	.title-screen-header {
		text-align:center;
		background: var(--dark-accent);
		padding: 1em;
	}
	.title-screen-title {
		font-size: 5vmin;
		margin:0;
		font-weight: bold;
		color: white;
	}
	.title-screen-title sup {
		height: 2.25em;
		width: 2.25em;
		display: inline-block;
		background-color: var(--light-accent);
		color: white;
		padding: 0.5em;
		font-size: 0.25em;
	}
	.title-screen-tag-line {
		color: var(--dim-accent);
		margin: 0;
	}

	.puzzle-list {
		display: grid;
		grid-template-rows: auto 1fr;
		padding: 1em 0;
	}
	.puzzle-list h2 {
		font-size: 0.75em;
		text-align: center;
	}
	.puzzle-list h2:before { content: "— " }
	.puzzle-list h2:after { content: " —" }

	.game-list {
		display: grid;
		grid-gap: 1em;
		grid-template-columns: repeat(auto-fit, 10em);
		grid-template-rows: auto auto 1fr;
		font-size: 0.75em;
		justify-content: center;
	}
	.game-item {
		text-decoration: none;
		color: var(--dim-accent);
		display: block;
		width: 10em;
		background-color: rgba(255,255,255,0.5);
		padding: 1em;
	}
	.board-game.game-item-board {
		height: 8em;
		width: 8em;
	}

	dl.game-item-details {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 1px;
		margin: 1px 0;
	}
	.game-item-details > * {
		padding: 0.25em;
		background-color: white;
	}
	.game-item-details dd { margin: 0; }
	.game-item-details dt {
		margin: 0;
		text-align: right;
		background:  var(--translucent-white);
	}
	.game-item-id {
		font-size: 0.75em;
		background-color: var(--dark-accent);
		color: var(--translucent-white);
		padding: 0.5em;
		text-align: center;
	}

</style>
