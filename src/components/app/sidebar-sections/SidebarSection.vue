<template lang="pug">
	div.sidebar-section-container(:class="{disabled}")
		h2.header( @click="toggleHidden" v-text="title")
		section.sidebar-section( :class="{closed: reallyClosed}" )
			slot
</template>

<script>
	export default {
		props: {
			title: String,
			disabled: {
				type: Boolean,
				default: false
			},
			closed: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			reallyClosed () { return this.disabled || this.closed; }
		},
		methods: {
			toggleHidden () { this.$emit("toggle", this.closed); }
		}
	};
</script>

<style>

	.sidebar-section-container:not(:first-of-type) { margin-top:0.5em; }
	.sidebar-section { padding:1em; margin-top:0; }
	.sidebar-section *+* { margin-top:0.5rem; }

	.closed { display:none }
	.disabled { opacity:0.5 }
	.header {
		font-size:1em;
		background: var(--light-accent);
		color: var(--dark-accent);
		padding: 0.5em;
		margin: 0;
		text-align:center;
		cursor:pointer;
	}
	.disabled .header {
		cursor:default;
	}
</style>
