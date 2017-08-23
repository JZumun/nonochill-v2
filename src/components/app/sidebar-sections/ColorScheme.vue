<template lang="pug">
	fieldset
		legend Color Scheme
		ul
			li( v-for="color,i in colors" :style="`--color:${color}`")
				label
					span(v-text="i+1")
					input(type="color" :value="colors[i]" @change="changeColors(i,$event.target.value)")
		button(@click.prevent="resetColors" ) revert colors
</template>

<script>
	import { CHANGE_COLOR, RESET_COLORS } from "store/mutations"


	export default {
		computed: {
			colors() { return this.$store.getters.colorsUsed }
		},
		methods: {
			changeColors(index,value) {
				this.$store.commit(CHANGE_COLOR,{ index, value });
			},
			resetColors() {
				this.$store.commit(RESET_COLORS);
			}
		}
	}
</script>

<style scoped>
	ul {
		display: grid;
		margin:0; padding:0;
		grid-template-columns: repeat(auto-fit,minmax(2em,1fr));
		grid-gap:0.25em;
	}

	li {
		--background-color: var(--dark-accent);
		display:block;
		width:100%;
		height:2em;
		margin:0;
		background: var(--color);
		border:1px solid var(--dim-accent);
		box-shadow: inset 0 0 0 2px var(--background-color);
		position:relative;
		cursor:pointer;
	}

	li:hover {
		opacity:0.5;
	}

	label {
		display:flex;
		height:100%;
		align-items: center;
		cursor:pointer;
	}

	input {
		border:0;
		background:0;
		margin:0;
		padding:0;
		width:100%;
		opacity:0;
		cursor:pointer;
	}

	span {
		display:block;
		color: var(--dim-accent);
		background: var(--dark-accent);
		padding:0.25em;
		height:100%;
	}

	button {
		cursor:pointer;
	}
</style>
