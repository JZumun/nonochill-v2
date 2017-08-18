<template lang="pug">
	div#app.whole(:style="colorStyling")
		sidebar
		section#main.main.page-section
			div.title-card(v-if="state==0")
				h1 Nono#[span Chill]#[sup v.2]
			game(  :disabled=" state!=1 ", :colorScheme="colors" )
			creator( :disabled="state!=2", :colorScheme="colors")
</template>

<script>
import store from "./store/Store"
import Sidebar from "./app-components/Sidebar.vue"
import Game from "./game-components/Game.vue"
import Creator from "./game-components/Creator.vue"
import Bus from "./pubsub/Bus"
import { GAME_START_EVT, GAME_READY_EVT, GAME_CLEAR_EVT, CREATOR_START_EVT, COLOR_CHANGE_EVT } from "./pubsub/Events"

const state = Object.freeze({
	NULL: 0,
	GAME: 1,
	CREATOR: 2,
})

export default {
	store,
  name: 'app',
  data () {
    return {
			colors: [],
    }
  },
	computed: {
		state() { return this.$store.state.mode },
		colorStyling() {
			return `${this.colors.map((color,index)=>{
				return `--state-${index+1}:${color};`
			}).join("")}`
		}
	},
	components: {
		Sidebar,
		Game,
		Creator
	},
	methods: {
	},
	created() {
		Bus.$on(GAME_START_EVT,_=>{ this.$store.commit("change-mode", state.GAME) });
		Bus.$on(CREATOR_START_EVT,_=>{ this.$store.commit("change-mode", state.CREATOR)  })
		Bus.$on(COLOR_CHANGE_EVT,colors=>{ this.$store.commit("change-colors",colors) })
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
