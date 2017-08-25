<template lang="pug">
	fieldset
		legend History
		div.buttons
			button(:disabled="past.length == 0" @click="undo") Undo
			button(:disabled="future.length == 0" @click="redo") Redo
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	import { UNDO_MOVE, REDO_MOVE } from "store/mutations"
	export default {
		computed: mapState({
			past: state => state.history.past,
			future: state => state.history.future
		}),
		methods: mapMutations({
			undo: UNDO_MOVE,
			redo: REDO_MOVE
		})
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
