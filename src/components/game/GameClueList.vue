<template lang="pug">
	ul.clues(
				:class="{ sparse,vertical,horizontal:!vertical }"
				:style="`--clue-gap: ${clueGap}`"
			)
		li.clue(
				:data-state="clue.val"
				v-for="clue in clues"
				v-text="clue.count"
			)
</template>

<script>
	export default {
		props: {
			width: Number,
			clues: Array,
			vertical: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			clueGap: function () { return this.clues ? this.width - this.clues.length : 0; },
			sparse: function () { return this.clues && (this.clues.length < this.width); }
		}

	};
</script>

<style>
	.clues {
		position:relative;
		margin:0;
		padding:0;
		font-size:2vmin;
		font-size: calc(22vmin/var(--board-size));
		background-color:var(--translucent-white);
		color: var(--state-1);
		display: grid;
		align-items: center;
		justify-items: center;
	}

	.clue[data-state="2"] { color:var(--state-2); }
	.clue[data-state="3"] { color:var(--state-3); }
	.clue[data-state="4"] { color:var(--state-4); }
	.clue[data-state="5"] { color:var(--state-5); }

	.clues.vertical {
		grid-template-rows: repeat(var(--clue-size),1fr);
		grid-template-columns: 1fr;
	}
	.clues.horizontal {
		grid-template-rows: 1fr;
		grid-template-columns: repeat(var(--clue-size),1fr);
	}

	.clues.horizontal.sparse:before {
		content:"";
		grid-column: span var(--clue-gap,1);
	}

	.clues.vertical.sparse:before {
		content:"";
		grid-row: span var(--clue-gap,1);
	}

	.clue { display:block; text-align:center; line-height:0.5 }

	.clues:nth-of-type(5n+5):not(:last-child)::after {
		content: "";
		display: block;
		position: absolute;
		background: var(--light-accent);
		--short-side: var(--board-gap);
		--long-side: 500%;
		--offset: calc(-1*var(--board-gap));
	}
	.clues.vertical:nth-of-type(5n+5):not(:last-child)::after {
		width: var(--short-side);
		height: var(--long-side);
		top: 0;
		right: var(--offset);
	}
	.clues.horizontal:nth-of-type(5n+5):not(:last-child)::after {
		height: var(--short-side);
		width: var(--long-side);
		left: 0;
		bottom: var(--offset);
	}
</style>
