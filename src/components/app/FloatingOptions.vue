<template lang="pug">
	.floating-options(v-if="show")
		fieldset.floating-option(v-if="colors.length > 1")
			legend Toggle Color
			ul.toggle-colors
				li.toggle-color(
					v-for="color,i in colors",
					:style="`--color:${color}`",
					:class="{highlighted: i+1 == anchor}",
					@click="anchorColor(i+1)"
				)
				li.toggle-color.reset(
					
					@click="anchorColor(null)"
				)
		game-history.floating-option
</template>

<script>
import GameHistory from "components/app/sidebar-sections/options/GameHistory.vue";
import SaveGame from "components/app/sidebar-sections/options/SaveGame.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { ACTION_ANCHOR_COLOR } from "store/actions";

export default {
	beforeMount () {
		this.$store.commit("accessibility/floatingOptions/toggle", window.document.body.clientWidth <= 800);
	},
	computed: {
		...mapState({ anchor: "colorAnchor", show: state => state.accessibility.floatingOptions.show }),
		...mapGetters({ colors: "colorsUsed" })
	},
	methods: {
		...mapActions({
			anchorColor: ACTION_ANCHOR_COLOR
		})
	},
	components: { GameHistory, SaveGame }
};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"

	.floating-option
	.floating-options 
		border-color $translucent-white
		color $dim-accent

	.floating-options 
		font-size 3vmin

		legend 
			font-size 0.75em

	.toggle-colors 
		display grid
		margin 0 
		padding 0
		grid-template-columns repeat(auto-fit,minmax(2.25em,1fr))
		grid-gap 0.25em
	

	.toggle-color 
		--background-color $translucent-white
		display block
		width 100%
		height 2em
		margin 0
		border 1px solid $translucent-white
		position relative
		cursor pointer
		padding 2px
	
		&:before 
			content ""
			display block
			height 100%
			width 100%
			background-color var(--color)
	
		&.reset 
			border 0
			&:before 
				content "reset"
				line-height 1.5em
				margin 0 0.25em	

		.highlighted 
			background $light-accent
			box-shadow 0 0 0 1px $light-accent
	
	.floating-option 
		& >>> button 
			color white
		& >>> .restart-level 
			display none
		& >>> small 
			display none
	
</style>
