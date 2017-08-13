<template lang="pug">
	div#app.whole
		section#sidebar.sidebar.page-section
			h1.game-title NonoChill#[sup v.2]
			sidebar-section(title="Play")
				form(@submit="start")
					fieldset
						legend Options
						form-field(name="Size")
							input.input(
								type="number"
								min="2" max="25"
								v-model="size"
							)
						form-field(name="Colors")
							input.input(
								type="number"
								min="1" max="5"
								value="1"
								v-model="colors"
							)
						button Start Game
		section#main.main.page-section
			game-board( v-if="size>0" )
</template>

<script>
import GameBoard from "./game-components/GameBoard.vue"
import SidebarSection from "./app-components/SidebarSection.vue"
import FormField from "./app-components/form/FormField.vue"
import Bus from "./pubsub/Bus"
import { GAME_START_EVT } from "./pubsub/Events"
export default {
  name: 'app',
  data () {
    return {
			size: 5,
			density: 0.6,
			colors: 3,
      msg: 'Welcome to Your Vue.js App'
    }
  },
	components: {
		GameBoard,
		SidebarSection,
		FormField
	},
	methods: {
		start(e) {
			e.preventDefault();
			Bus.$emit(GAME_START_EVT,{
				size: parseInt(this.size),
				colors: parseInt(this.colors) ,
				density: parseFloat(this.density)
			})
		}
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

.sidebar {
	background-color:var(--dark-accent);
	color:var(--translucent-white);
	overflow-y:auto;
}
.sidebar *+* { margin-top:0.5rem; }

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
}

.game-title {
	font-size:1.5em;
	padding:0.5em;
	text-align:center;
	margin:0;
	background: var(--dark-accent);
	color:var(--translucent-white);
}
.game-title sup {
	font-size:0.5em;
	font-weight:bold;
}
.game-size {
	white-space: nowrap;
}
</style>
