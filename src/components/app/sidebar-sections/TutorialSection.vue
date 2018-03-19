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
						description: `Nonograms are a puzzle that's made up of a grid of cells,
							surrounded by clues that help determine how the cells should be filled.`
					}
				},
				{
					element: "#section-board-game",
					popover: {
						title: "Clicking on a cell cycles it through its states.",
						description: `A cell can be empty, filled with color (black, pink, etc.), or intentionally marked empty (X)`
					},
					action () {
						this.setTiles([
							[0, 0, 1],
							[0, 0, 2],
							[0, 0, -1],
							[0, 0, 0],
							[0, 0, 1],
							[0, 1, 1],
							[0, 2, 1],
							[0, 3, 1],
							[1, 0, 2],
							[1, 1, -1]
						]);
					}
				},
				{
					element: "#section-clues-vertical",
					popover: {
						title: "Each row and column has a corresponding clue.",
						description: `A clue is a list of numbers that say how many cells in that row or column have that color
							and in what order they appear (from top to bottom or left to right)`
					}
				},
				{
					element: "#section-clues-horizontal",
					popover: {
						title: "If a clue is greyed out, it means the row or column is 'solved'.",
						description: `Once all the clues are solved, then you've solved the puzzle!`
					}
				},
				{
					element: "#main",
					stageBackground: "var(--background)",
					popover: {
						title: "The End",
						description: `Try solving the provided puzzle. If you're up to the challenge, create a new puzzle in the
							Play section in the sidebar.`
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
			}, args[3] || 500), () => {})();
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
