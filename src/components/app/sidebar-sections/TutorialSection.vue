<template lang="pug">
	#tutorial
		form(@submit.prevent="start")
			fieldset
				legend Tutorial
				small This tutorial will teach you the basics of solving nonograms.
				button Play Tutorial
</template>

<script>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { ACTION_START_GAME, ACTION_SET_TILE } from "store/actions";
export default {
	data () {
		return {
			game: "NC8vNC8vMi8vW1t7MSwxfXsxLDF9ezIsMX1dfFt7MSwyfXsyLDF9XXxbezEsMX17MSwxfV18W3sxLDF9ezEsMn1dXS8vW1t7MSw0fV18W3sxLDF9XXxbezEsMX17MSwxfV18W3syLDJ9ezEsMn1dXS8vIzNhMWEyZj8jQTM2NThDPyNlN2NiZGQ/I2ZmNzE4Nz8jOGRiMGUx",
			step: 0,
			driver: new Driver({
				animate: false,
				stageBackground: "var(--translucent-white)",
				onHighlighted: () => {
					// Fix bug where popover falls out of the screen
					window.setTimeout(() => {
						const popover = window.document.querySelector("#driver-popover-item");
						const screenHeight = window.document.body.clientHeight;
						const screenWidth = window.document.body.clientWidth;
						const { top: topString, left: leftString, height, width } = window.getComputedStyle(popover);
						const [top, left] = [topString, leftString].map(x => parseInt(x));
						if (top < 0) {
							popover.style.top = "0px";
						} else if (top > screenHeight - height) {
							popover.style.top = `${screenHeight - height}px`;
						}
						if (left < 0) {
							popover.style.left = "0px";
						} else if (left > screenWidth - width) {
							popover.style.left = `${screenWidth - width}px`;
						};

						(this.steps[this.step].action || (() => {})).apply(this);
						this.step++;
						if (!this.driver.hasNextStep()) {
							this.highlightAll();
						}
					}, 100);
				}
			}),
			steps: [
				{
					stageBackground: "var(--background)",
					element: ".game-title",
					popover: {
						title: "Welcome to Nonochill!",
						description: "This guide will show you the basics of solving nonogram puzzles."
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#main",
					popover: {
						title: "The Board",
						description: "The board is made up of a grid of cells, surrounded by vertical and horizontal clues."
					}
				},
				{
					element: "#section-board-game",
					popover: {
						title: "Board Cell",
						description: `Clicking on a cell cycles it through its states. Its states are: the colors,
							the X marker (for marking intentional empty spaces), and the empty space. Try clicking
							on the cells so that they all go back to being empty spaces.`
					},
					action () {
						this.setTiles([
							[0, 0, 1, 1],
							[0, 1, 2, 1],
							[0, 2, -1, 1],
							[0, 3, 0, 1]
						]);
					}
				},
				{
					element: "#section-clues-horizontal",
					popover: {
						title: "Horizontal Clues",
						description: `Each set of clues tell how many consecutive cells in the row is filled
							in with the color, starting from the left going right.`
					}
				},
				{
					element: "#section-clues-horizontal .clues:nth-of-type(1)",
					popover: {
						title: "First Row",
						description: `The clue in the first row, for example, says that there is a group of four black cells
							lined up in this row.`
					}
				},
				{
					element: "#section-board-game .game-row:nth-of-type(1)",
					popover: {
						title: "First Row",
						description: `Because there are only four cells in the row, the answer is pretty simple. Click on
							all the cells on the first row until they are all black, and you'll satisfy the clue!`
					}
				},
				{
					element: "#section-clues-horizontal .clues:nth-of-type(4)",
					popover: {
						title: "Last Row",
						description: `The clue in the last row states that, from left to right,
							there are <b>two pink cells</b>, followed by <b>two black cells</b>.`
					}
				},
				{
					element: "#section-board-game .game-row:nth-of-type(4)",
					popover: {
						title: "Fourth Row",
						description: `The only way to satisfy the clue is by putting pink on the first and second cells,
							and putting black on the third and fourth cells. Click on the cells until you've satisfied the clue.`
					},
					action () {
					}
				},
				{
					element: "#section-clues-horizontal",
					popover: {
						title: "Fourth and First Row, Solved",
						description: `If we did the last steps correctly,
						we should see that the first and fourth row clues are grayed out, telling us that they
						have been satisfied.
						If a clue is greyed out, it's not necessarily correct, however. It's possible that we did
						something that satisfies one clue, but would break another.`
					}
				},
				{
					element: "#section-clues-horizontal .clues:nth-of-type(2)",
					popover: {
						title: "Second Row",
						description: `For example, this clue only says that there's one and only one black cell in this row.`
					}
				},
				{
					element: "#section-board-game .game-row:nth-of-type(2)",
					popover: {
						title: "Second Row",
						description: `Right now, filling in any one of these cells will satisfy the clue, but we
						currently don't know which is the correct cell. We could guess, but maybe the other clues can help us?`
					},
					action () {
						this.setTiles([
							[1, 0, 1],
							[1, 0, 0, 500],
							[1, 1, 1],
							[1, 1, 0, 500],
							[1, 2, 1],
							[1, 2, 0, 500],
							[1, 3, 1],
							[1, 3, 0, 500]
						]);
					}
				},
				{
					element: "#section-clues-vertical",
					popover: {
						title: "Vertical Clues",
						description: `Vertical clues tell how many consecutive cells in the column is filled
							in with the color, starting from the top going down.`
					}
				},
				{
					element: "#section-clues-vertical .clues:nth-of-type(3)",
					popover: {
						title: "Third Column",
						description: `If we've done everything correctly so far, then the third row should already be greyed out.
							Nice!`
					}
				},
				{
					element: "#section-board-game",
					popover: {
						title: "Third Column",
						description: "Mark the empty spaces with an X, because we're now sure that nothing should be put in them."
					},
					action () {
						this.highlightColumn(2);
					}
				},
				{
					element: "#section-clues-vertical .clues:nth-of-type(1)",
					popover: {
						title: "First Column",
						description: `This clue says that starting from the top, there's one black cell, then another black cell
							, then a pink cell in the end. The two black cells have their own numbers, which means that
							they are non-consecutive, or that there is at least one space between them.`
					}
				},
				{
					element: "#section-board-game",
					popover: {
						title: "First Column",
						description: `We've already filled up some cells in the first column. To complete the clue, we should add a
							black cell on the third row (so that it isn't next to the existing black cell),
							and mark the second row as empty.`
					},
					action () {
						this.highlightColumn(0);
					}
				},
				{
					element: "#section-clues-vertical .clues:nth-of-type(4)",
					popover: {
						title: "Fourth Column",
						description: `This clue states that there is one black cell on its own,
							and then two consecutive black cells.`,
						position: "left"
					}
				},
				{
					element: "#section-board-game",
					popover: {
						title: "Fourth Column",
						description: `Because there are black cells already on the board, we can already figure out what to put in the second and third row
							of the fourth column. Remember, the clue is 1(space)2, from top to bottom.`
					},
					action () {
						this.highlightColumn(3);
					}
				},
				{
					element: "#main",
					popover: {
						title: "The End",
						description: "At this point, the puzzle is not yet solved, but you should be able to complete it on your own. Good luck!"
					}
				}
			]
		};
	},
	methods: {
		setTile (x, y, val) {
			return this.$store.dispatch(ACTION_SET_TILE, { tile: { x, y }, curr: val ? 0 : 1, next: val });
		},
		setTiles (list) {
			list.reverse().reduce((prev, args) => () => setTimeout(() => {
				this.setTile(...args);
				prev();
			}, args[3] || 200), () => {})();
		},
		start () {
			this.step = 0;
			this.$store.dispatch(ACTION_START_GAME, this.game);
			this.$nextTick(function () {
				this.driver.defineSteps(this.steps);
				this.driver.start();
			});
		},
		highlightColumn (i) {
			document.querySelectorAll(".board .game-tile").forEach(tile => tile.style.opacity = 0.1);
			document.querySelectorAll(`.game-tile:nth-child(${i + 1})`).forEach(tile => tile.style.opacity = 1);
		},
		highlightAll () {
			document.querySelectorAll(".board .game-tile").forEach(tile => tile.style.opacity = 1);
		}
	}
};
</script>

<style>
#driver-popover-item, #driver-popover-item * {
	font-family: inherit !important;
}
</style>
