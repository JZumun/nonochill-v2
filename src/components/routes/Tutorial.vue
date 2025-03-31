<script>
import interactiveBoard from "../mixins/InteractiveBoard.vue";
import routeMixin from "../mixins/routeMixin";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { ACTION_START_GAME_FROM_LONGCODE, ACTION_SET_TILE } from "store/actions";
import { count } from "utils/ArrayUtils";

export default {
	mixins: [interactiveBoard, routeMixin],
	data () {
		return {
			game: "NC8vNC8vMi8vW1t7MSwxfXsxLDF9ezIsMX1dfFt7MSwyfXsyLDF9XXxbezEsMX17MSwxfV18W3sxLDF9ezEsMn1dXS8vW1t7MSw0fV18W3sxLDF9XXxbezEsMX17MSwxfV18W3syLDJ9ezEsMn1dXS8vIzNhMWEyZj8jQTM2NThDPyNlN2NiZGQ/I2ZmNzE4Nz8jOGRiMGUx",
			step: 0,
			errorMessage: null,
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
					element: ".board-container",
					popover: {
						title: "The Board",
						description: `A Nonogram is a puzzle made up of a grid of cells,
							surrounded by clues that say how each cell should be filled.`
					},
					action () {
						const tiles = [
							...count(4).flatMap(x => count(4).map(y => [x, y, x%2+1, 100])),
							...count(4).flatMap(y => count(4).map(x => [x, y, 0, x+y ? 100 : 0]))
						]
						this.setTiles(tiles)
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-board-game",
					popover: {
						title: "Clicking on a cell cycles it through its states.",
						description: `A cell can be empty or filled with color (black, pink, etc.). You can mark a cell with (X) to indicate it is empty, or just leave it blank.`
					},
					action () {
						this.setTiles([
							[0, 0, 1],
							[1, 1, 1, 500],
							[1, 1, 2],
							[2, 2, 1, 500],
							[2, 2, 2],
							[2, 2, -1],
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-horizontal",
					popover: {
						title: "Each clue consists of a list of numbers.",
						description: `Each number shows how many adjacent cells are of that color. `
					},
					action () {
						this.setTiles([
							[1, 1, 0],
							[2, 2, 0],
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-horizontal .clues:nth-child(1)",
					popover: {
						title: "If a clue is greyed out, it means the row or column is 'solved'.",
						description: `A clue can be satisfied in multiple ways. It doesn't necessarily mean the row or column is actually correct.`
					},
					action () {
						this.setTiles([
							[0, 2, 1],
							[0, 3, 1],
							[0, 1, 1],
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-vertical .clues:nth-child(3)",
					popover: {
						title: "Two adjacent clues of the same color mean they are separated by one or more empty cells.",
						description: `The number of empty cells is not stated, and must be determined through logic.`
					},
					position: "left",
					action () {
						this.setTiles([
							[1,2,1 ],
							[1,2,-1, 1000],
							[2,2,1],
							[2,2,-1, 1000],
							[3,2,1],
							[2,2,0, 1000],
							[3,2,0],
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-horizontal .clues:nth-child(4)",
					popover: {
						title: "Two adjacent clues of different colors can have zero or more empty cells between them",
						description: `The number of empty cells must also be determined through logic.`
					},
					action () {
						this.setTiles([
							[3,0,2],
							[3,1,2],
							[3,2,1],
							[3,3,1]
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-vertical .clues:nth-child(4)",
					popover: {
						title: "The order of the numbers is important.",
						description: `You can't switch them around`
					},
					position: "left",
					action () {
						this.setTiles([
							[1, 3, 1],
							[1, 3, -1, 1500],
							[2, 3, 1]
						]);
					}
				},
				{
					stageBackground: "var(--background)",
					element: "#section-clues-vertical",
					popover: {
						title: "Once all the clues are satisfied, then the puzzle will be solved!",
					},
					action () {
						this.setTiles([
							[1, 1, 1],
							[2, 0, 1],
							[1, 1, 0, 2000],
							[2, 0, 0]
						]);
					}
				},
				{
					
					element: ".board-container",
					stageBackground: "var(--background)",
					popover: {
						title: "The End",
						description: `Try finishing this puzzle. Or, you can start a new puzzle in the
							Play section in the sidebar.`
					}
				}
			]
		};
	},
	methods: {
		load () {
			return this.start();
		},
		setTile (x, y, val) {
			return this.$store.dispatch(ACTION_SET_TILE, { tile: { x, y }, curr: val ? 0 : 1, next: val });
		},
		setTiles (list) {
			list.reverse().reduce((prev, args) => () => setTimeout(() => {
				this.setTile(...args);
				prev();
			}, args[3] || 250), () => {})();
		},
		async start () {
			this.ready = false;
			this.step = 0;
			await this.$nextTick();

			await this.$nextTick();
			this.$store.dispatch(ACTION_START_GAME_FROM_LONGCODE, this.game);
			
			this.ready = true;
			setTimeout(()=>{
				this.driver.defineSteps(this.steps);
				this.driver.start();
			}, 250)
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

<style lang="stylus">
	@import "~styles/variables.styl"
		
	#driver-popover-item, #driver-popover-item * 
		font-family inherit !important
	
	div#driver-popover-item .driver-popover-footer button 
		border 0
		background $light-accent
		color white
		text-shadow none
		border-radius 0
</style>