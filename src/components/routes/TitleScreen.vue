<template lang="pug">
	board-container.title-screen
		.title-screen-header
			h1.title-screen-title NonoChill#[sup v.2]
			p.title-screen-tag-line A Nonogram puzzle game written in Vue.
		.puzzle-list.first-half
			h2 Recent Community Puzzles
			div.game-list(v-if="loading || error")
				game-card.game-placeholder-item(v-for="x in [0,1,2,3,4]" :key="x" :style="`--delay:${x}s`" empty)
			div.game-list(v-else)
				router-link.game-item(to="/tutorial")
					game-card(:width="4", :colors="2", label="Tutorial")
				template(v-for="game in games.slice(0,4)")
					router-link.game-item( v-if="game && game.id" :key="game.id" :to="`/game/${game.id}`")
						game-card(v-bind="game")
		.puzzle-list.second-half
			h2 Recent Community Puzzles
			div.game-list(v-if="loading || error")
				game-card.game-placeholder-item(v-for="x in [4,3,2,1,0]" :key="x" :style="`--delay:${x}s`" empty)
			div.game-list(v-else)
				template(v-for="game in games.slice(4,9)")
					router-link.game-item(v-if="game && game.id" :key="game.id" :to="`/game/${game.id}`")
						game-card(v-bind="game")
	</template>

<script>
	import BoardContainer from "components/app/BoardContainer.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";
	import GameCard from "components/game/GameCard.vue";

	import { mapState, mapActions } from "vuex";
	import { ACTION_LOAD_PUZZLE_LIST } from "store/modules/puzzleList";
	export default {
		components: { GameCard, LoadingSymbol, BoardContainer },
		computed: {
			...mapState({
				games: state => state.puzzles.puzzles,
				loading: state => state.puzzles.loading,
				error: state => state.puzzles.error
			}),
			errorMessage () { return this.error && "Unable to load puzzle list"; }
	},
		methods: mapActions({ load: ACTION_LOAD_PUZZLE_LIST }),
		mounted () {
			this.load();
		}
	};
</script>

<style lang="stylus" scoped>
	

	.title-screen 
		grid-template-rows auto 1fr auto
		grid-gap 1em
		color $dim-accent
		font-size 2vmin
		padding 1em
		margin 1em

	.title-screen-header 
		text-align center
		background  $dark-accent
		padding 1em
		grid-row 2
		border-bottom 1em solid $light-accent
		display flex
		flex-direction column
		align-items center
		justify-content center

	.title-screen-title 
		font-size 7.5vmin
		margin 0
		font-weight bold
		color white

	.title-screen-title sup 
		height 2.25em
		width 2.25em
		display inline-block
		background-color $light-accent
		color white
		padding 0.5em
		font-size 0.25em

	.title-screen-tag-line 
		color  $dim-accent
		margin 0


	.puzzle-list 
		display grid
		grid-template-rows auto auto

	.puzzle-list h2 
		font-size 0
		text-align center
		opacity 0.5
		margin 1em 0


	.puzzle-list.second-half h2 
		grid-row 2

	.puzzle-list h2:before  
		content "— " 
	.puzzle-list h2:after  
		content " —" 

	.game-list 
		display grid
		grid-gap 1em
		grid-template-columns repeat(5, 1fr)
		font-size 0.75em
		justify-content center

	.game-item  
		text-decoration none

	.game-placeholder-item 
		width 100%
		background $translucent-white
		animation-name fade-in-out
		animation-duration 5s
		animation-delay calc(-1*var(--delay, 0)/1)
		animation-iteration-count infinite
		animation-direction alternate


	@keyframes fade-in-out 
		from 
			opacity 0.8 
		to 
			opacity 0.1 
</style>
