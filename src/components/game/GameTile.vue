<template lang="pug">
	.game-tile(
		:data-state="state"
		@mouseenter="mouseEnter"
		@mousedown="mouseDown"
	)
		.game-tile-contents
			slot
</template>

<script>
	import incrementColor from "utils/game/IncrementColor"
	import { ACTION_SET_TILE } from "store/actions";

	export default {
		props: {
			state: Number,
			maxState: Number,
			id: Object
		},
		computed: {
			anchor() { return this.$store.state.colorAnchor }
		},
		methods: {
			mouseEnter: function(event) {
				if (event.buttons==1) { this.toggle( event.shiftKey ) }
			},
			mouseDown: function(event) {
				this.toggle( event.shiftKey )
			},
			toggle: function(reverse) {
				let next;
				if (!this.anchor) {
					next = incrementColor(this.state, this.maxState, reverse)
				} else {
					next = incrementColor( this.state == this.anchor ? 1 : this.state > 0 ? 0 : this.state, 1, reverse );
					next = next == 1 ? this.anchor : next;
				}

				if (next != this.state) {
					this.$store.dispatch(ACTION_SET_TILE, {
						tile: this.id,
						curr: this.state,
						next
					});
				}
			}
		}
	}
</script>

<style scoped>
	.game-tile {
		position:relative;
		--scale-x:0;
		--scale-y:0;
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

	[data-state] {
		--scale-x:0.6;
		--scale-y:0.6;
		--opacity:1;
		--bgcolor:var(--state-1);
	}
	[data-state="0"] {
		--scale-x:0;
		--scale-y:0;
		--opacity:0;
	}
	[data-state="2"] { --bgcolor:var(--state-2); }
	[data-state="3"] { --bgcolor:var(--state-3); }
	[data-state="4"] { --bgcolor:var(--state-4); }
	[data-state="5"] { --bgcolor:var(--state-5); }

	[data-state="-1"] {
		--scale-y:0.8;
		--scale-x:0.2;
		--bgcolor:var(--gray-accent);
		--opacity:1;
	}
	[data-state="-1"]:before {
		--rotate:45deg;
	}
	[data-state="-1"]:after {
		--rotate:-45deg;
	}

	.win .game-tile {
		--scale-x:1;
		--scale-y:1;
		overflow:visible;
	}
	.win [data-state="-1"] {
		--bgcolor:transparent;
	}
</style>
