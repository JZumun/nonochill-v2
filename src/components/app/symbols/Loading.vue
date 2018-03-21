<template lang="pug">
	span.loading-symbol-container
		.loading-symbol(v-if="display && !error")
		small.loading-symbol-error(v-if="error", v-text="error")
</template>

<script>
export default {
	props: {
		display: {
			type: Boolean,
			default: false
		},
		error: {
			type: String,
			default: null
		}
	}
}
</script>

<style>
	.loading-symbol-container {
		margin-left: 0.25em;
	}
	.loading-symbol {
		display:inline-block;
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
