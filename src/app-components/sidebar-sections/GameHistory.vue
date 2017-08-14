<template lang="pug">
	fieldset
		legend History
		div.buttons
			button(:disabled="past.length == 0" @click="undo") Undo
			button(:disabled="future.length == 0" @click="redo") Redo
</template>

<script>
	import debounce from "debounce";
	import Bus from "../../pubsub/Bus"
	import { TILE_TOGGLE_EVT, GAME_START_EVT , GAME_CLEAR_EVT } from "../../pubsub/Events"

	const invertMove = move => ({
		undone: true,
		tile: move.tile,
		next: move.curr,
		curr: move.next
	})
	const invertMoves = moves => moves.reverse().map(invertMove)
	const invertAndEmitMoves = moves => invertMoves(moves)
															.map(move=>(Bus.$emit(TILE_TOGGLE_EVT,move),move))

	export default {
		data() {
			return {
				past: [],
				future: [],
				staged: []
			}
		},
		methods: {
			commitMoves: debounce(function(){
				this.past.push(this.staged);
				this.staged = [];
			},500),
			performMoves(moves) {

			},
			queueMove: function(move) {
				if (move.undone) return;

				this.future = []
				this.staged.push(move);
				this.commitMoves();
			},
			undo() {
				const moves = this.past.pop();
				const inverted = invertAndEmitMoves(moves);
				this.future.push(inverted);
			},
			redo() {
				const moves = this.future.pop();
				const inverted = invertAndEmitMoves(moves);
				this.past.push(inverted);
			},
			clear() {
				this.future = [];
				this.past = [];
				this.staged = [];
			}
		},
		created() {
			Bus.$on(TILE_TOGGLE_EVT,this.queueMove);
			Bus.$on(GAME_START_EVT,this.clear);
			Bus.$on(GAME_CLEAR_EVT,this.clear);
		}
	}
</script>

<style scoped>
	.buttons {
		display:grid;
		grid-gap:0.5em;
		grid-auto-flow: column;
	}
	button {
		margin-top:0;
		display:inline-block;
	}
</style>
