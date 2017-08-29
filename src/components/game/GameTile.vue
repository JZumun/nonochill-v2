<template lang="pug">
	.game-tile( :data-state="state" )
		.game-tile-contents
			slot
</template>

<script>
	export default {
		props: {
			state: Number
		}
	};
</script>

<style scoped>
	.game-tile {
		position:relative;
		--scale-x:0;
		--scale-y:0;
		--rotate:0deg;
		--opacity:0;
		--bgcolor:var(--translucent-white);
		color: var(--dark-accent);
		z-index:1;
		background-color: white;
		overflow: hidden;
		display: flex;
    align-items: center;
    justify-content: center;
	}

	.game-tile-contents {
		position:relative;
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
		--scale-x:var(--fill-scale,0.8);
		--scale-y:var(--fill-scale,0.8);
		--opacity:1;
		--bgcolor:var(--state-1);
	}
	[data-state="1"] {
		color: var(--light-accent);
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
		--scale-y:var(--fill-scale,0.8);
		--scale-x:var(--cross-scale,0.2);
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
