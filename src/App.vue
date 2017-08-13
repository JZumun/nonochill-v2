<template>
  <div id="app">
		<div>
			Size <input type="number" min="0" max="25" v-model="size" @change="start" />
			Density <input type="number" step="0.1" v-model="density" @change="start" />
			Colors <input type="number" max=5 min=1 v-model="colors"  @change="start" />
		</div>
		<game-board v-if="size>0" :size="parseInt(size)" :density="parseFloat(density)" :colors="parseInt(colors)"></game-board>
  </div>
</template>

<script>
import GameBoard from "./game-components/GameBoard.vue"
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
		GameBoard
	},
	methods: {
		start() { Bus.$emit(GAME_START_EVT) }
	}
}
</script>

<style>
*,*:before,*:after {
	box-sizing:border-box;
}

html {
	--translucent-white: rgba(255,255,255,0.85);
	--background: #574656;
	--dark-accent: #3a1a2f;
	--dim-accent: #86657B;
	--light-accent: #ca8aaf;
	--gray-accent: #d1c9c9;
	--highlight-color: #f6f2f3;;
	--sidebar-width: 20vw;

	--black: #14100f;
	--red: #a83018;
	--green: #18A86F;
	--orange: #B55C11;
	--yellow: #FFDC00;
	--blue: #0074D9;

	--state-1:var(--dark-accent);
	--state-2:var(--light-accent);
	--state-3:var(--dim-accent);
	--state-4:var(--red);
	--state-5:var(--blue);

}

body {
	font-family:"Roboto Slab";
	font-weight: 300;

	margin:0;
	padding:0;

	background-repeat:no-repeat;
	background-color: var(--background);
}

* {
	font-weight:inherit;
}

#app {
	min-height:100vh;
	display:grid;
	grid-template-rows: 2em 1fr;
	padding: 2em;
}
</style>
