<template lang="pug">
	fieldset
		legend History
		div.history-buttons
			button(:disabled="past.length == 0" @click="undo" data-shortcut="ctrl+z") Undo
			button(:disabled="future.length == 0" @click="redo" data-shortcut="ctrl+shift+z") Redo
			button.secondary.restart-level(@click="clear") Restart Level
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import { ACTION_UNDO_MOVE, ACTION_REDO_MOVE } from "store/modules/history";
	import { RESET_BOARD } from "store/mutations";
	export default {
		computed: mapState({
			past: state => state.history.past,
			future: state => state.history.future
		}),
		methods: {
			...mapActions({
				undo: ACTION_UNDO_MOVE,
				redo: ACTION_REDO_MOVE
			}),
			...mapMutations({ clear: RESET_BOARD })
		}
	};
</script>

<style>
	.history-buttons {
		display:grid;
		grid-gap:0.5em;
		grid-template-columns: 1fr 1fr;
	}
	.history-buttons button {
		margin-top:0;
	}
</style>
