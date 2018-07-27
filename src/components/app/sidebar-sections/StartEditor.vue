<template lang="pug">
	div
		#create-game
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize")
				range-field( name="Colors" :min="1" :max="5" :value="colors" @input="setColors")
				force-router-link(to="/editor") Start Editor
		#create-from-image
			fieldset
				legend Generate From Image
				range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize")
				form-field(name="File")
					input(type="file" name="image", accept=".png, .jpg, .jpeg")
			
</template>

<script>
	import ForceRouterLink from "components/app/ForceRouterLink.vue";
	import RangeField from "components/app/form/RangeField.vue";
	import FormField from "components/app/form/FormField.vue";

	import { mapState, mapMutations } from "vuex";
	import { ACTION_START_EDITOR } from "store/actions";
	import { ACTION_UPLOAD } from "store/modules/upload";

	import { random } from "utils/RandomUtils";

	export default {
		components: { RangeField, ForceRouterLink, FormField },
		computed: {
			...mapState("options/editor", ["size", "colors"])
		},
		methods: {
			...mapMutations("options/editor", ["setSize", "setColors"])
		}
	};
</script>
