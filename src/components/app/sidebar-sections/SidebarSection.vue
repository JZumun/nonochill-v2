<template lang="pug">
	div.sidebar-section-container(:class="{disabled}")
		h2.sidebar-section-header( @click="toggleHidden" v-text="title")
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

<style lang="stylus" scoped>
	
	
	.sidebar-section  
		padding 1em

	.closed  
		display none 
	.disabled  
		opacity 0.5 

	.sidebar-section-header 
		font-size 1em
		background $light-accent
		color $dark-accent
		padding 0.5em
		margin 0
		text-align center
		cursor pointer
	
	.disabled .sidebar-section-header 
		cursor default
	
</style>
