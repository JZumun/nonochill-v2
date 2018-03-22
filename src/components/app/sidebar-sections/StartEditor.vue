<template lang="pug">
	#create-game
		fieldset
			legend Options
			range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize")
			range-field( name="Colors" :min="1" :max="5" :value="colors" @input="setColors")
			force-router-link(to="editor") Start Editor
</template>

<script>
	import ForceRouterLink from "components/app/ForceRouterLink.vue";
	import RangeField from "components/app/form/RangeField.vue";

	import { mapState, mapMutations } from "vuex";
	import { ACTION_START_EDITOR } from "store/actions";

	import { random } from "utils/RandomUtils";

	export default {
		components: { RangeField, ForceRouterLink },
		computed: {
			...mapState("options/editor", ["size", "colors"])
		},
		methods: {
			...mapMutations("options/editor", ["setSize", "setColors"])
		}
	};
</script>
