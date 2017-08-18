<template lang="pug">
	fieldset
		legend Color Scheme
		ul
			li( v-for="color,i in colors" :style="`--color:${color}`")
				input(type="color" :value="colors[i]" @change="changeColors(i,$event.target.value)")
			li
				button(@click.prevent="resetColors" ) Reset
</template>

<script>
	import { CHANGE_COLOR, RESET_COLORS } from "../../store/mutations"


	export default {
		computed: {
			colors() { return this.$store.state.colors }
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
		width: 100%;
		margin:0;
		background: var(--color);
		border:1px solid var(--dim-accent);
		box-shadow: inset 0 0 0 2px var(--background-color);
	}

	li:hover {
		opacity:0.5;
	}

	li:last-of-type {
		border:0;
		grid-column: span 2;
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

	button {
		width:100%;
		height:100%;
		cursor:pointer;
	}
</style>
