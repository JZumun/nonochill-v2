<template>
  <div id="app">
		<game-board :size="10" :density="0.6"></game-board>
  </div>
</template>

<script>
import GameBoard from "./GameBoard.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
	components: {
		GameBoard
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
	--dark-accent: #4a2a3f;
	--dim-accent: #6c5662;
	--light-accent: #ca8aaf;
	--gray-accent: #c1b9b9;
	--highlight-color: #f6f2f3;;
	--sidebar-width: 20vw;
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
</style>
