<template lang="pug">
	div.board#title-card
		.game-row(v-for="row,i in contents" :key="i")
			game-tile(v-for="tile,j in row" :key="j" :state="tile.value" style="font-size:8vmin")
				| {{tile.content}}
</template>

<script>
	import { count } from "utils/ArrayUtils";
	import { random } from "utils/RandomUtils";
	import GameTile from "../game/GameTile.vue";

	const populate = content => ({ content, value: random(-1, 3) });
	export default {
		components: { GameTile },
		data () {
			return {
				contents: [
					count(4).map(el => "").map(populate),
					"/no/no/".split("/").map(populate),
					"/ch/ill/".split("/").map(populate),
					count(4).map(el => "").map(populate)
				]
			};
		}
	};
</script>

<style scoped>
	.board {
		--board-size:4;
		--board-gap:1px;
		display:grid;
		grid: repeat(var(--board-size),1fr) / 1fr;
		grid-gap:var(--board-gap);
		width:100%;
		height:100%;
	}
	.game-row {
		display:grid;
		grid: 1fr / repeat(var(--board-size),1fr);
		grid-gap:var(--board-gap);
	}
</style>
