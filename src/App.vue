<template lang="pug">
	div#app.whole(:style="colorStyling")
		section#main.main.page-section
				router-view
		sidebar#sidebar.sidebar
			footer
				span
					| Created by&nbsp;
					a.author(href="https://github.com/JZumun")
						img(src="https://avatars3.githubusercontent.com/u/10479613")
						| JZumun
					| &nbsp;using #[a(href="https://vuejs.org/") Vue JS].&nbsp;
				span Background images from #[a(href="https://unsplash.com/") Unsplash].&nbsp;
				span Music by #[a(href="https://cchound.com/post/173227390201/source-bandcamp-author-aerocity-cc-by-can") Aerocity] under #[a(href="https://creativecommons.org/licenses/by/4.0/") CCBY].&nbsp;
				span Hosted on #[a(href="https://github.com/JZumun/nonochill-v2") Github].&nbsp;
		github-corner-link#github-link(href="https://github.com/JZumun/nonochill-v2")
</template>

<script>
	import { mapState, mapGetters } from "vuex";
	import store from "store/Store";

	import Sidebar from "components/app/Sidebar.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import GithubCornerLink from "components/app/GithubCornerLink.vue";
	import FloatingOptions from "components/app/FloatingOptions.vue";

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
			}).join("")}`
		}),
		components: {
			Sidebar,
			GameBoard,
			GithubCornerLink,
			FloatingOptions
		}
	};
</script>

<style>
.whole {
	display:grid;
  	grid-template-columns:var(--sidebar-width) 1fr;
	grid-template-areas: "sidebar game";
  	height:100vh;
  	text-transform: lowercase;
}

.sidebar {
	grid-area: game;
	grid-area: sidebar;
}
.main {
	display: grid;
	background: var(--translucent-background);
}
.main-game-board {
	--margin: 2em;
	--game-width-restraint: calc(100vw - (var(--sidebar-width) + 2*var(--margin)));
	--game-height-restraint: calc(100vh - 2*var(--margin));


	background-color: var(--translucent-white);
	padding:2em;

	position: relative;
	height: var(--game-width-restraint);
	width: var(--game-width-restraint);
	max-width: var(--game-height-restraint);
	max-height: var(--game-height-restraint);

	justify-self: center;
	align-self: center;
	display:grid;
}

.hidden {
	display:none !important;
}

footer {
	font-size:0.5em;
	opacity: 0.5;
	padding:2em;
	margin-top:auto;
	text-align:center;
}
footer span {
	display: inline-block;
	white-space: nowrap;
}
footer img {
	width:2em;
	vertical-align: middle;
	border-radius:50%;
	margin-right:0.5ch;
}

.author {
	white-space: nowrap;
}

@media all and (max-width:800px) {
	.whole {
		width:100%;
		grid-template-columns: 100%;
		grid-template-rows: 1fr 1fr;
		grid-template-areas: "game" "sidebar";
	}
	.page-section {
		height: 100%;
		width:100%;
	}
	.main-game-board {
		width: calc(100vw - 2em);
		height: calc(100vw - 2em);
		margin:1em auto;
		padding:0.5em;
		max-width: 100%;
		max-height: 100%;
	}

	.sidebar {
		max-height:none;
		height:100%;
	}
}
</style>
