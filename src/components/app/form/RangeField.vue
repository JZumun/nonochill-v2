<template lang='pug'>
	form-field(:name="name", class="form-range")
		input.range(
				type="range"
				:min="min"
				:max="max"
				step="any"
				:value="innerValue"
				@input="updateRange($event.target.value)"
				@mouseup="snapValue"
		)
		span.value(v-text="prettyValue")
</template>

<script>
	import FormField from "./FormField.vue";

	export default {
		components: { FormField },
		props: {
			value: Number,
			name: String,
			min: {
				type: Number,
				default: 0
			},
			max: Number,
			step: {
				default: 1,
				type: Number
			}
		},
		computed: {
			prettyValue () {
				return Math.floor(this.value) === this.value ? this.value : this.value.toFixed(2);
			}
		},
		data () {
			return {
				innerValue: this.value
			};
		},
		methods: {
			updateRange (value) {
				this.innerValue = Number(value);
				const roundedValue = Math.round(Number(value) / this.step) * this.step;
				this.$emit("input", roundedValue);
			},
			snapValue () {
				this.innerValue = this.value;
			}
		}
	};
</script>

<style scoped>
	.form-field.form-range {
		display:grid;
		grid-template-columns: 5.5ch 4fr 3ch;
		grid-gap:0.5em;
	}
	.range {
		width:100%;
	}

	input[type=range] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: transparent; /* Otherwise white in Chrome */
	}

	input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: var(--light-accent);
  cursor: pointer;
  margin-top: -0.25em;
}
input[type=range]::-moz-range-thumb {
	height: 1em;
	width: 1em;
	border-radius: 1em;
	background: var(--light-accent);
	cursor: pointer;
	margin-top: -0.25em;
	box-shadow:0;
	border:0;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.5em;
	border-radius:0.5em;
  cursor: pointer;
  background: var(--dim-accent);
}

input[type=range]::-moz-range-track {
	width: 100%;
	height: 0.5em;
	border-radius:0.5em;
	cursor: pointer;
	background: var(--dim-accent);
}
</style>
