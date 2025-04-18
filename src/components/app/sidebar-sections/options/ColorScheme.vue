<template lang="pug">
	fieldset
		legend Color Scheme
		ul.color-scheme
			li.color-box( v-for="color,i in colors" :style="`--color:${color}`" :class="{highlighted: i+1 == anchor}")
				label
					shortcut-span(v-text="i+1")
					input(type="color" :value="colors[i]" @change="changeColors({index: i,value: $event.target.value})")
		button(@click.prevent="resetColors" ) revert colors
</template>

<script>
	import { mapState, mapGetters, mapMutations } from "vuex";
	import { CHANGE_COLOR, RESET_COLORS } from "store/mutations";
	import ShortcutSpan from "components/app/symbols/Shortcut.vue";

	export default {
		components: { ShortcutSpan },
		computed: {
			...mapState({
				anchor: "colorAnchor",
				shortcut: s => s.shortcut.show
			}),
			...mapGetters({ colors: "colorsUsed" })
		},
		methods: mapMutations({
			changeColors: CHANGE_COLOR,
			resetColors: RESET_COLORS
		})
	};
</script>

<style lang="stylus" scoped>
	
	
	.color-scheme 
		display grid
		margin 0 
		padding 0
		grid-template-columns repeat(auto-fit,minmax(2em,1fr))
		grid-gap 0.25em
	

	.color-box 
		--background-color $dark-accent
		--outline-color $dark-accent
		display block
		width 100%
		height 2em
		margin 0
		background var(--color)
		border 1px solid $dim-accent
		box-shadow inset 0 0 0 2px var(--background-color), 0 0 0 1px var(--outline-color)
		position relative
		cursor pointer

		&:hover
			opacity 0.5
		
		&.highlighted
			--outline-color $light-accent
	
		label 
			display flex
			height 100%
			align-items center
			cursor pointer
	
		input 
			border 0
			background 0
			margin 0
			padding 0
			width 100%
			opacity 0
			cursor pointer
	
		span
			color $dim-accent
			background $dark-accent
			padding 0.25em
			height 100%
			font-size: 0.5em
</style>
