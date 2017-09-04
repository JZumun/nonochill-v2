<template lang="pug">
	label.form-field
		span.label( v-if="name" v-text="name")
		slot
</template>

<script>
	export default {
		props: {
			name: String
		}
	};
</script>

<style>
.form-field {
	position:relative;
	display:grid;
	grid-auto-flow:column;
	grid-gap:0.25em;
	align-items:baseline;
	flex: 1 1 0;
}

.form-field > *+* {
	margin-top:0;
}

.form-field .label {
	display:block;
}
</style>
