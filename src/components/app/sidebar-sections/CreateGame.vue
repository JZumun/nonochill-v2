<template lang="pug">
	#create-game
		form(@submit.prevent="start({size,colors})")
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" v-model.number="size" )
				range-field( name="Colors" :min="1" :max="5" v-model.number="colors" )
				button Start
</template>

<script>
	import RangeField from "components/app/form/RangeField.vue";

	import { mapActions } from "vuex";
	import { ACTION_START_EDITOR } from "store/actions";

	export default {
		components: { RangeField },
		data () {
			return {
				size: 5,
				colors: 3,
				closed: true
			};
		},
		methods: mapActions({ start: ACTION_START_EDITOR })
	};
</script>
