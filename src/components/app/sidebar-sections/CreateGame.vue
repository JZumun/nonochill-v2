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
	import RangeField from "components/app/form/RangeField.vue"

	import { mapMutations } from "vuex"
	import modes from "store/values/modes"
	import { START_EDITOR } from "store/mutations"

	export default {
		components: { RangeField },
		data() {
			return {
				size: 5,
				colors: 3,
				closed: true
			}
		},
		methods: mapMutations({start: START_EDITOR})
	}
</script>
