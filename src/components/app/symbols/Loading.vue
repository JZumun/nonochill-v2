<template lang="pug">
	span.loading-symbol(v-if="display")
</template>

<script>
export default {
	props: {
		display: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style>
	.loading-symbol {
		display:inline-block;
		margin-left: 0.25em;
		height:1em;
		width: 1em;
		border: 2px solid var(--dim-accent);
		border-top-color: var(--light-accent, currentColor);
		border-radius: 50%;
		animation: spin 0.5s linear infinite
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
