<template lang="pug">
	.game-tile(
		:class="[{highlight},state]"
		@mouseenter="mouseEnter"
		@mousedown="mouseDown"
	)
		.game-tile-contents
			slot
</template>

<script>
	import highlighter from "./mixins/highlighter"
	import eventBus from "./pubsub/Bus"
	import { TILE_TOGGLE_EVT } from "./pubsub/Events"
	import { TILE_STATES, MAX, MAX_INDEX } from "./utils/TileStates"

	const getNextState = (current, reverse=false, index = TILE_STATES.indexOf(current)) =>
		reverse
			? index === 0 ? MAX : TILE_STATES[ index - 1 ]
			: index === MAX_INDEX ? TILE_STATES[0] : TILE_STATES[ index + 1 ];

	export default {
		mixins: [highlighter],
		props: {
			state: String,
			id: Object
		},
		methods: {
			mouseEnter: function(event) {
				this.setHighlight();
				if (event.buttons==1) { this.toggle( event.shiftKey ) }
			},
			mouseDown: function(event) {
				this.toggle( event.shiftKey )
			},
			toggle: function(reverse) {
				eventBus.$emit(TILE_TOGGLE_EVT, {
					tile: this.id,
					current: this.state,
					next: getNextState(this.state,reverse)
				});
			}
		}
	}
</script>

<style scoped>
	.game-tile {
		position:relative;
		--scale-x:1;
		--scale-y:1;
		--rotate:0deg;
		--opacity:0;
		--bgcolor:var(--translucent-white);
		z-index:1;
		background-color: white;
		overflow: hidden;
	}

	.game-tile-contents {
		position:absolute;
		top:50%;
		left:50%;
		margin-top:-1em;
		margin-left:-50%;
		text-align: center;
		width:100%;
		font-size: 5vmin;
		line-height: 1em;
		z-index:2;
	}

	.game-tile:before, .game-tile:after {
		transform: rotate(var(--rotate)) scaleX(var(--scale-x)) scaleY(var(--scale-y));
		content:"";
		display:block;
		height:100%;
		width:100%;
		position:absolute;
		top:0;
		left:0;
		opacity:var(--opacity);
		background-color: var(--bgcolor);
		z-index:0;
		will-change:transform;
		transition: opacity 0.1s, transform 0.1s;
	}

	.filled {
		--scale-x:0.6;
		--scale-y:0.6;
		--opacity:1;
		--bgcolor:var(--dark-accent);
	}

	.crossed {
		--scale-y:0.8;
		--scale-x:0.2;
		--bgcolor:var(--gray-accent);
		--opacity:1;
	}
	.crossed:before {
		--rotate:45deg;
	}
	.crossed:after {
		--rotate:-45deg;
	}

	.highlight {
		background-color:var(--highlight-color);
	}
</style>
