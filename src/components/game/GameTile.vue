<template lang="pug">
	svg.game-tile(
			height="10" width="10"
			viewBox="0 0 10 10"
			:style="`--fill-color: var(--state-${state})`" 
			@hover="console.log('hello')"
		)
		path.tile-background(d="M0 0h10v10H0z")
		path.fill-symbol(v-if="state >= 1" d="M2 2h6v6H2z")
		path.cross-symbol(v-if="state === -1" d="M3.586 2.172L2.172 3.586 3.586 5 2.172 6.414l1.414 1.414L5 6.414l1.414 1.414 1.414-1.414L6.414 5l1.414-1.414-1.414-1.414L5 3.586 3.586 2.172z")
</template>

<script>
	export default {
		props: {
			state: Number,
			default: 0
		}
	};
</script>

<style lang="stylus" scoped>
	

	.game-tile 
		width 100%
		height 100%
		&.highlighted 
			.tile-background 
				fill $highlight-color
		> *
			pointer-events none

	.tile-background 
		fill white
	.tile-fade-enter, .tile-fade-leave-active 
		opacity 0
		
	.fill-symbol, .cross-symbol 
		transition transform 0.3s
		transform-origin 50% 50%
	.fill-symbol 
		fill var(--fill-color, transparent)
	.cross-symbol 
		fill darken($gray-accent, 30%)

	.win 
		.game-tile 
			z-index 1
		.cross-symbol 
			transform scale(0)
		.fill-symbol 
			transform scale(2)
</style>
