<template lang="pug">
	svg.game-tile(
			height="10" width="10"
			viewBox="0 0 10 10"
			:style="`--fill-color: var(--state-${state})`" )
		path.tile-background(d="M0 0h10v10H0z")
		transition(name="tile-fade")
			path.fill-symbol(v-if="state >= 1" d="M2 2h6v6H2z")
		transition(name="tile-fade")
			path.cross-symbol(v-if="state === -1" d="M3.586 2.172L2.172 3.586 3.586 5 2.172 6.414l1.414 1.414L5 6.414l1.414 1.414 1.414-1.414L6.414 5l1.414-1.414-1.414-1.414L5 3.586 3.586 2.172z")
</template>

<script>
	export default {
		props: {
			state: Number,
			default: 0
		}
	};
</script>

<style>
	.game-tile {
		width:100%;
		height: auto;
	}

	.fill-symbol, .cross-symbol {
		transition: opacity 0.1s, fill 0.1s, transform 0.3s;
		transform-origin: 50% 50%;
	}
	.fill-symbol {
		fill: var(--fill-color, transparent);
	}
	.cross-symbol {
		fill: var(--gray-accent);
	}
	.tile-background {
		fill: white;
		transition: fill 0.1s;
	}

	.tile-fade-enter, .tile-fade-leave-active {
		opacity: 0;
	}

 	.win .cross-symbol { transform: scale(0) }
	.win .fill-symbol { transform: scale(2) }
</style>
