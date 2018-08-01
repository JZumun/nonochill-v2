<template lang="pug">
	fieldset
		legend History
		div.history-buttons
			button(:disabled="past.length == 0" @click="undo") 
				| Undo
				shortcut-span ctrl+z
			button(:disabled="future.length == 0" @click="redo") 
				| Redo
				shortcut-span ctrl+shift+z
			button.secondary.restart-level(@click="clear") Restart Level
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import { ACTION_UNDO_MOVE, ACTION_REDO_MOVE } from "store/modules/history";
	import { RESET_BOARD } from "store/mutations";
	import ShortcutSpan from "components/app/symbols/Shortcut.vue";

	export default {
		components: { ShortcutSpan },
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

<style lang="stylus" scoped>
	.history-buttons
		display grid
		grid-gap 0.5em
		grid-template-columns 1fr 1fr

	button
		margin-top 0

</style>
