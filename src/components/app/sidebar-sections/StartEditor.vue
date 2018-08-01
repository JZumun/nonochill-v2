<template lang="pug">
	div
		#create-game
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize")
				range-field( name="Colors" :min="1" :max="5" :value="colors" @input="setColors")
				
				div
					label
						input(type="checkbox" v-model="useImage")
						| Generate From Image #[small (#[em beta])]
					image-field(
						v-if="useImage" 
						name="image"  
						@change="setFile"
						required
					)
				.buttons
					force-router-link(to="/editor") Start Editor
					loading-symbol(:display="loading", :error="errorMessage")
				
</template>

<script>
	import ForceRouterLink from "components/app/ForceRouterLink.vue";
	import RangeField from "components/app/form/RangeField.vue";
	import FormField from "components/app/form/FormField.vue";
	import ImageField from "components/app/form/ImageField.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import { mapState, mapMutations } from "vuex";

	import { random } from "utils/RandomUtils";

	export default {
		components: { RangeField, ForceRouterLink, FormField, ImageField, LoadingSymbol },
		data () {
			return {
				useImage: false
			};
		},
		watch: {
			useImage (val) {
				if (!val) { this.setFile(null); }
			}
		},
		computed: {
			...mapState("options/editor", ["size", "colors", "file", "loading", "errorMessage"])
		},
		methods: {
			...mapMutations("options/editor", ["setSize", "setColors", "setFile"])
		}
	};
</script>
