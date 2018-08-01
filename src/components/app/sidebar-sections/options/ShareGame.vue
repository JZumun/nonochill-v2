<template lang="pug">
fieldset
	legend Level Code
	small copy this code to share this level with others.
	form.buttons(v-if="!shortCode" @submit.prevent="generateShortCode")
		input(
			type="text" 
			name="label" 
			placeholder="title (optional)" 
			:value="label" 
			@change="setLabel($event.target.value)"
			pattern="([A-Za-z0-9À-ž\\\s]){0,20}"
			title="Only alphanumeric characters, to a maximum length of 20."
		)
		button(:disabled="savingGame") Generate Level Code
		loading-symbol(:display="savingGame" :error="errorMessage")
	.code-area(v-if="shortCode != null")
		textarea(v-text="shortCode" readonly onclick="this.focus();this.select()" rows="1")
		small or copy this link:
		textarea(v-text="url" readonly onclick="this.focus();this.select()" rows="2" style="white-space:nowrap")
</template>

<script>
	import FormField from "components/app/form/FormField.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import { mapGetters, mapState } from "vuex";
	import { ACTION_GENERATE_SHORTCODE, ACTION_SET_SHORTCODE } from "store/modules/shortcode";

	export default {
		components: { LoadingSymbol, FormField },
		data () {
			return {
				url: window.location.origin + window.location.pathname
			};
		},
		computed: {
			...mapGetters({
				code: "serialization"
			}),
			...mapState({
				errorMessage: state => state.shortCode.errorMessage,
				shortCode: state => state.shortCode.code,
				savingGame: state => state.shortCode.loading,
				label: state => state.shortCode.label
			})
		},
		methods: {
			generateShortCode () {
				this.$store.dispatch(ACTION_GENERATE_SHORTCODE);
			},
			setLabel (value) {
				this.$store.commit("shortCode/setLabel", value);
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
	};
</script>
