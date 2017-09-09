<template lang="pug">
	div#app.whole(:style="colorStyling" v-hotkey="keymap")
		section#main.main.page-section
			game-board
		sidebar#sidebar.sidebar
			footer
				| Created by&nbsp;
				a.author(href="https://github.com/JZumun")
					img(src="https://avatars3.githubusercontent.com/u/10479613")
					| JZumun
				| &nbsp;using #[a(href="https://vuejs.org/") Vue JS].
				| Hosted on #[a(href="https://github.com/JZumun/nonochill-v2") Github].
		github-corner-link#github-link(href="https://github.com/JZumun/nonochill-v2")
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import store from "store/Store";
	import { ACTION_ANCHOR_COLOR, ACTION_REVERSE_COLOR, ACTION_UNDO_MOVE, ACTION_REDO_MOVE } from "store/actions";
	import { RESET_BOARD } from "store/mutations";

	import Sidebar from "components/app/Sidebar.vue";
	import GameBoard from "components/game/GameBoard.vue";
	import GithubCornerLink from "components/app/GithubCornerLink.vue";

	import TitleScreen from "components/mixins/titleScreen";

	const preventDefault = fn => e => { e.preventDefault(); fn(e); };
	const assignTo = (map = {}, thing) => el => { map[el] = thing; };

	export default {
		store,
		name: "app",
		computed: {
			...mapState({
				reverse: "colorReverse",
				anchor: "colorAnchor",
				maxColor: "colorNum",
				board: "board",
				state: "mode",
				colorStyling: ({ colorScheme }) => `${colorScheme.map((color, index) => {
					return `--state-${index + 1}:${color};`;
				}).join("")}`
			}),
			keymap () {
				const keyMap = {
					"`": {
						keydown: e => this.reverseColor(true),
						keyup: e => this.reverseColor(false)
					}
				};
				[1, 2, 3, 4, 5].forEach(assignTo(keyMap, {
					keydown: e => this.anchorColor(e.keyCode - 48),
					keyup: e => this.anchorColor(null)
				}));
				["ctrl+z", "meta+z"].forEach(assignTo(keyMap, preventDefault(this.undo)));
				["ctrl+shift+z", "meta+shift+z"].forEach(assignTo(keyMap, preventDefault(this.redo)));
				["ctrl+c", "meta+c"].forEach(assignTo(keyMap, preventDefault(this.clear)));

				return keyMap;
			}
		},
		methods: {
			...mapActions({
				anchorColor: ACTION_ANCHOR_COLOR,
				reverseColor: ACTION_REVERSE_COLOR,
				undo: ACTION_UNDO_MOVE,
				redo: ACTION_REDO_MOVE
			}),
			...mapMutations({
				clear: RESET_BOARD
			})
		},
		components: {
			Sidebar,
			GameBoard,
			GithubCornerLink
		},
		mixins: [TitleScreen]
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
	grid-area: sidebar;
}
.main {
	--margin: 2em;
	--game-width-restraint: calc(100vw - (var(--sidebar-width) + 2*var(--margin)));
	--game-height-restraint: calc(100vh - 2*var(--margin));

	grid-area: game;

	background-color: var(--translucent-white);
	padding:2em;

	position: relative;
	height: var(--game-width-restraint);
	width: var(--game-width-restraint);
	max-width: var(--game-height-restraint);
	max-height: var(--game-height-restraint);

	justify-self: center;
	align-self: center;
	display:flex;
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
		width:100%;
		max-height:100%;
	}
	.main {
		width: calc(100vw - 2em);
		height: calc(100vw - 2em);
		margin:1em auto;
		padding:0.5em;
	}

	.sidebar {
		max-height:none;
		height:100%;
	}
}
</style>
