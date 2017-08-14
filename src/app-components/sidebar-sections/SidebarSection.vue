<template lang="pug">
	div.sidebar-section-container
		h2.header( @click="toggleHidden" v-text="title")
		section.sidebar-section( :class="{hidden}" )
			slot
</template>

<script>
	export default {
		props: {
			title: String,
			initiallyHidden: {
				type: Boolean,
				default: true
			}
		},
		data() { return { hidden: this.initiallyHidden } },
		methods: {
			toggleHidden() { return this.hidden = !this.hidden }
		}
	}
</script>

<style scoped>
	.sidebar-section { padding:1em; margin-top:0; }

	.hidden { display:none }
	.invisible { opacity:0 }
	.header {
		font-size:1em;
		background: var(--light-accent);
		color: var(--dark-accent);
		padding: 0.5em;
		margin: 0;
		text-align:center;
		cursor:pointer;
	}
</style>
