<template lang="pug">
	div#app.whole(:style="colorStyling")
		sidebar
		section#main.main.page-section
			div.title-card(v-if="state==0")
				h1 Nono#[span Chill]#[sup v.2]
			game-board( v-else :colors="colorNum", :board="board", :rules="rules" )
</template>

<script>
import { jwerty } from "jwerty"

import store from "store/Store"
import { UPDATE_RULES, ANCHOR_COLOR, UNANCHOR_COLOR } from "store/mutations"
import state from "store/values/modes"

import {count} from "utils/ArrayUtils"

import Sidebar from "components/app/Sidebar.vue"
import GameBoard from "components/game/GameBoard.vue"

import computedRule from "utils/game/GenerateRule"

export default {
	store,
  name: 'app',
	computed: {
		board() { return this.$store.state.board },
		rules() { return this.$store.state.rules },
		state() { return this.$store.state.mode },
		colorNum() { return this.$store.state.colorNum },
		colors() { return this.$store.state.colorScheme },
		colorStyling() {
			return `${this.$store.state.colorScheme.map((color,index)=>{
				return `--state-${index+1}:${color};`
			}).join("")}`
		}
	},
	watch: {
		board(val) {
			if (this.state == 2) {
				this.$store.commit(UPDATE_RULES,{
					row: this.board.map(row=>computedRule(row)),
					column: count(this.board.length).map( col => computedRule( this.board.map(row => row[col]) ) )
				})
			}
		}
	},
	methods: {
		keyup(e) {
				this.$store.commit(UNANCHOR_COLOR,e.keyCode - 48);
		},
		keydown(e) {
			const value = e.keyCode - 48;
			if (this.$store.state.colorAnchor != value && this.$store.state.colorNum >= value)
				this.$store.commit(ANCHOR_COLOR,value);
		}
	},
	created() {
		window.addEventListener("keydown",jwerty.event("[1-5]",this.keydown));
		window.addEventListener("keyup",jwerty.event("[1-5]",this.keyup))
	},
	components: {
		Sidebar,
		GameBoard
	}
}
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
