<template lang="pug">
	div.sidebar-section-container
		h2.header( @click="toggleHidden" v-text="title")
		section.sidebar-section( :class="{closed}" )
			slot
</template>

<script>
	export default {
		props: {
			title: String,
			closed: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			toggleHidden() { this.$emit("toggle",this.closed) }
		}
	}
</script>

<style scoped>
	.sidebar-section { padding:1em; margin-top:0; }

	.closed { display:none }
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
