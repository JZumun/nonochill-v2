<template lang="pug">
	.board( :style="`--board-size:${board.length}`" )
		.game-row(v-for="row,x in board", :key="x")
			game-tile(v-for="tile,y in row", :key="`${x}-${y}`", :state="board[x][y]")
</template>

<script>
	import GameTile from "./GameTile.vue";
	export default {
		components: {GameTile},
		props: {
			board: { type: Array, default() {return [[0]]} }
		}
	}
</script>

<style>

</style>
