<template lang="pug">
fieldset
	legend Level Code
	small copy this code to share this level with others.
	.buttons(v-if="!shortCode")
		button(@click="generateShortCode" :disabled="savingGame") Generate Level Code
		loading-symbol(:display="savingGame")
	textarea(v-if="shortCode != null" v-text="shortCode" readonly onclick="this.focus();this.select()" rows="1")
</template>

<script>
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import { mapGetters, mapState } from "vuex";
	import { ACTION_GENERATE_SHORTCODE, CLEAR_SHORTCODE } from "store/modules/shortcode";

	export default {
		components: { LoadingSymbol },
		computed: {
			...mapGetters({
				code: "serialization"
			}),
			...mapState({
				shortCode: state => state.shortCode.code,
				savingGame: state => state.shortCode.loading
			})
		},
		methods: {
			generateShortCode() {
				this.$store.dispatch(ACTION_GENERATE_SHORTCODE);
			}
		},
		watch: {
			code (oldValue, newValue) {
				this.$store.commit(CLEAR_SHORTCODE);
			}
		}
	}
</script>
