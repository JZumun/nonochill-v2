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
	}
</script>

<style scoped>
.form-field {
	position:relative;
	display:block;
	flex: 1 1 0;
}

.label {
	font-size:0.75em;
	position:absolute;
	top:0.33em;
	left:0.33em;
}
</style>
