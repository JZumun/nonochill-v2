<template lang="pug">
	span.loading-symbol-container
		.loading-symbol(v-if="display && !error", :style="`--size:${size}; --thickness:${thickness}`")
		template(v-if="display && !error")
			slot(name="message" :message="message")
				small.loading-symbol-message( v-text="message" )
		template(v-if="error")
			slot(name="error" :error="error")
				small.loading-symbol-error( v-text="error")
</template>

<script>
export default {
	props: {
		display: {
			type: Boolean,
			default: false
		},
		message: {
			type: String,
			default: null
		},
		error: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: "1em"
		},
		thickness: {
			type: String,
			default: "2px"
		}
	}
};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables.styl"

	.loading-symbol-container 
		margin-left 0.25em
		align-self center
		justify-self center
		display flex
		align-items center
		gap 0.5em
	
	.loading-symbol 
		display inline-block
		height var(--size, 1em)
		width var(--size, 1em)
		border var(--thickness, 2px) solid $dim-accent
		border-top-color $light-accent
		border-radius 50%
		animation spin 0.5s linear infinite
	

	@keyframes spin 
		0%  
			transform rotate(0deg) 
		100%  
			transform rotate(360deg) 
	
</style>
