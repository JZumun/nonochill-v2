<template lang="pug">
.board-container
    slot
</template>

<style lang="stylus" scoped>
	@import "~styles/variables.styl"

	$margin = 2em
	$game-height-restraint =  "calc(100vh - 2*%s)" % $margin
	$game-width-restraint = "calc(100vw - (%s + 2*%s))" % ($sidebar-width $margin)

	.board-container
		background-color $translucent-white
		padding 2em

		position relative
		height $game-width-restraint
		width $game-width-restraint
		max-width $game-height-restraint
		max-height $game-height-restraint

		justify-self center
		align-self center
		display grid

	@media all and (max-width 800px) 
		.board-container
			width calc(100vw - 2em)
			height calc(100vw - 2em)
			margin 1em auto
			padding 0.5em
			max-width 100%
			max-height 100%
</style>