<template lang="pug">
	div#app.whole(:style="colorStyling")
		sidebar
		section#main.main.page-section
			title-screen(v-if="state==0")
			game-board( v-else )
</template>

<script>
import { jwerty } from "jwerty";

import { mapState, mapActions } from "vuex";
import store from "store/Store";
import { ACTION_ANCHOR_COLOR, ACTION_REVERSE_COLOR } from "store/actions";

import Sidebar from "components/app/Sidebar.vue";
import GameBoard from "components/game/GameBoard.vue";
import TitleScreen from "components/app/TitleScreen.vue";

export default {
	store,
	name: "app",
	computed: mapState({
		reverse: "colorReverse",
		anchor: "colorAnchor",
		maxColor: "colorNum",
		board: "board",
		state: "mode",
		colorStyling: ({ colorScheme }) => `${colorScheme.map((color, index) => {
			return `--state-${index + 1}:${color};`;
		}).join("")}`
	}),
	methods: mapActions({
		anchorColor: ACTION_ANCHOR_COLOR,
		reverseColor: ACTION_REVERSE_COLOR
	}),
	created () {
		window.addEventListener("keydown", jwerty.event("[1-5]", e => this.anchorColor(e.keyCode - 48)));
		window.addEventListener("keyup", jwerty.event("[1-5]", e => this.anchorColor(null)));
		window.addEventListener("keydown", jwerty.event("`", e => this.reverseColor(true)));
		window.addEventListener("keyup", jwerty.event("`", e => this.reverseColor(false)));
	},
	components: {
		Sidebar,
		GameBoard,
		TitleScreen
	}
};
</script>

<style>
.whole {
	display:grid;
  	grid-template-columns:var(--sidebar-width) 1fr;
  	height:100vh;
  	text-transform: lowercase;
}

.main {
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
	display:flex;
}

.title-card {
	display:grid;
	align-content: center;
	justify-content:center;
	width:100%;
}

.title-card h1 {
	font-size:10vmin;
	width:100%;
	text-align:center;
	color: var(--light-accent);
	margin:0;
	position:relative;
	z-index:1;
	padding:0.5em;
	border:1px solid;
}
.title-card span {
	color: var(--dark-accent);
	position:relative;
	padding:0.65em 0.25em;
	background:var(--translucent-white);
	margin:0 -0.175em;
	z-index:-1;
}

.title-card sup {
	font-weight:bold;
	font-size:0.5em;
	color: var(--dim-accent);
}

cite:before {
	content: " - "
}

.hidden {
	display:none !important;
}

@media all and (max-width:800px) {
	.whole {
		display:block;
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
}
</style>
