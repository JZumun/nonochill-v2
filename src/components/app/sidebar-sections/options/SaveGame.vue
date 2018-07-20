<template lang="pug">
	fieldset.save-game
		legend Save Game
		small Save the current state of the game. You can load this later using "Load From Save" in the play section.
		button(@click="save") Save Game
		small.saved(v-if="saved") Saved!
</template>

<script>
import { ACTION_SAVE_GAME } from "store/modules/localsave";
export default {
	data () {
		return {
			saved: false
		};
	},
	methods: {
		save () {
			this.saved = false;
			this.$store.dispatch(ACTION_SAVE_GAME)
				.then(_ => {
					this.saved = true;
					window.setTimeout(_ => {
						this.saved = false;
					}, 5000);
				})
		}
	}
};
</script>

<style lang="stylus" scoped>
	small  
		display block 
		margin-top 0 
	 
	button  
		float left 
	 
	.saved  
		float left 
		margin-left 0.5em 
		margin-top 1em 
		vertical-align baseline 
		line-height 1rem 
	 
</style>
