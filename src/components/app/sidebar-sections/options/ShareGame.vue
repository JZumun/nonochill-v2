<template lang="pug">
fieldset
	legend Level Code
	small copy this code to share this level with others.
	.buttons(v-if="!shortCode")
		button(@click="generateShortCode" :disabled="savingGame") Generate Level Code
		loading-symbol(:display="savingGame")
	.code-area(v-if="shortCode != null")
		textarea(v-text="shortCode" readonly onclick="this.focus();this.select()" rows="1")
		small or copy this link:
		textarea(v-text="url" readonly onclick="this.focus();this.select()" rows="2" style="white-space:nowrap")
</template>

<script>
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import { mapGetters, mapState } from "vuex";
	import { ACTION_GENERATE_SHORTCODE, ACTION_SET_SHORTCODE } from "store/modules/shortcode";

	export default {
		components: { LoadingSymbol },
		data() {
			return {
				url: window.location.origin + window.location.pathname
			}
		},
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
				this.$store.dispatch(ACTION_SET_SHORTCODE, null);
			},
			shortCode (val) {
				this.url = window.location.origin + window.location.pathname + "#/game/" + val;
			}
		}
	}
</script>
