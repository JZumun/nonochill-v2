<template lang="pug">
	fieldset
		legend History
		div.buttons
			button(:disabled="past.length == 0" @click="undo") Undo
			button(:disabled="future.length == 0" @click="redo") Redo
</template>

<script>
	import { UNDO_MOVE, REDO_MOVE } from "../../store/mutations"
	export default {
		computed: {
			past() { return this.$store.state.history.past },
			future() { return this.$store.state.history.future }
		},
		methods: {
			undo() { this.$store.commit(UNDO_MOVE) },
			redo() { this.$store.commit(REDO_MOVE) }
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
