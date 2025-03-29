<template lang="pug">
	div#app.whole(:style="colorStyling")
		section#main.main.page-section
			router-view
		sidebar#sidebar.sidebar
			sidebar-footer
		github-corner-link#github-link(href="https://github.com/JZumun/nonochill-v2")
</template>

<script>
	import { mapState, mapGetters } from "vuex";
	import store from "store/Store";

	import Sidebar from "components/app/Sidebar.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import GithubCornerLink from "components/app/GithubCornerLink.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";
	import SidebarFooter from "components/app/sidebar-sections/Footer.vue";

	import { ACTION_RETRIEVE_BG_INFO } from "store/modules/background";

	export default {
		store,
		name: "app",
		computed: mapState({
			reverse: "colorReverse",
			anchor: "colorAnchor",
			maxColor: "colorNum",
			board: "board",
			colorStyling: ({ colorScheme }) => `${colorScheme.map((color, index) => {
				return `--state-${index + 1}:${color};`;
			}).join("")}`,
			bgUrl: state => state.background.url
		}),
		components: {
			Sidebar,
			GameBoard,
			GithubCornerLink,
			FloatingOptions,
			SidebarFooter
		},
		watch: {
			bgUrl: function (url) {
				if (url) {
					document.body.style.backgroundImage = `url(${url})`;
				}
			}
		},
		created () {
			this.$store.dispatch(ACTION_RETRIEVE_BG_INFO);
		}
	};
</script>

<style lang="stylus">
	@import "~styles/index"

	.whole
		height 100vh
		text-transform lowercase 
		display grid 
		grid-template-columns $sidebar-width 1fr 
		grid-template-areas "sidebar game" 
		--translucent-white $translucent-white
		--background $background


	.sidebar
		grid-area sidebar 

	.main
		grid-area game
		display grid

	@media all and (max-width 800px)
		.whole
			width 100% 
			grid-template-columns 100% 
			grid-template-rows 1fr 1fr 
			grid-template-areas "game" "sidebar" 

		.page-section
			height 100% 
			width 100% 

		.sidebar
			max-height none 
			height 100% 
</style>
