<template lang="pug">
	ul.clues(
				v-bind:class="{ highlight, sparse, solved }"
				v-bind:style="`--clue-gap: ${clueGap}`"
				v-on:mouseenter="setHighlight"
			)
		li.clue(
				v-for="clue in clues"
				v-text="clue"
			)
</template>

<script>
	import highlighter from "./mixins/highlighter"
	export default {
		mixins: [highlighter],
		props: {
			solved: Boolean,
			width: Number,
			clues: Array
		},
		computed: {
			clueGap: function() { return this.clues ? this.width - this.clues.length : 0 },
			sparse: function() { return this.clues  && (this.clues.length < this.width ) }
		}

	}
</script>

<style>
	.clues {
		position:relative;
		margin:0;
		padding:0;
		font-size:2vmin;
		font-size: calc(30vmin/var(--board-width));
		background-color:var(--translucent-white);

		display: grid;
		align-items: center;
		justify-items: center;
	}
	.clues.solved {
		color: #ccc;
	}
	.vertical .clues {
		grid-template-rows: repeat(var(--clue-size),1fr);
		grid-template-columns: 1fr;
	}
	.horizontal .clues {
		grid-template-rows: 1fr;
		grid-template-columns: repeat(var(--clue-size),1fr);
	}

	.horizontal .sparse:before {
		content:"";
		grid-column: span var(--clue-gap,1);
	}

	.vertical .sparse:before {
		content:"";
		grid-row: span var(--clue-gap,1);
	}

	.clue { display:block; text-align:center; }

	.clues:nth-of-type(5n+5):not(:last-child)::after {
		content: "";
		display: block;
		position: absolute;
		background: var(--light-accent);
		--short-side: var(--board-gap);
		--long-side: 500%;
		--offset: calc(-1*var(--board-gap));
	}
	.vertical .clues:nth-of-type(5n+5):not(:last-child)::after {
		width: var(--short-side);
		height: var(--long-side);
		top: 0;
		right: var(--offset);
	}
	.horizontal .clues:nth-of-type(5n+5):not(:last-child)::after {
		height: var(--short-side);
		width: var(--long-side);
		left: 0;
		bottom: var(--offset);
	}
</style>
