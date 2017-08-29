<template lang="pug">
	div.board#title-card.win(@mouseleave="clearHighlight")
		.game-row(v-for="row,x in contents" :key="x")
			game-tile(
				v-for="value,y in row"
				:key="y"
				:state="parseInt(value)"
				:class="{highlighted: isHighlighted({x,y})}"
				@mouseenter.native="setHighlight({x,y})"
			)
</template>

<script>
	import highlighter from "../mixins/highlighter";
	import GameTile from "../game/GameTile.vue";

	export default {
		mixins: [highlighter],
		components: { GameTile },
		data () {
			return {
				contents: `00000000000000000
00000000000000000
03020201010202010
00000000000000000
01110111011101110
01010101010101010
01010111010101110
00000000000000000
01110101010100100
01000111010100100
01110101010110110
00000000000000000
00000202022000000
00000020002200000
00000000000000000
00303020102030300
00000000000000000`.split(/\s+/g).map(row => row.split(""))
			};
		}
	};
</script>

<style scoped>
	.board {
		--board-size:17;
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

	.game-tile.highlighted {
		background: var(--highlight-color) ;
	}
</style>
