<template lang='pug'>
	form-field(:name="name", class="form-range")
		input.input-range(
				type="range"
				:min="min"
				:max="max"
				step="any"
				:value="innerValue"
				@input="updateRange($event.target.value)"
				@mouseup="snapValue()"
		)
		input.input-text.input(
				v-if="!simple"
				type="number"
				:value="prettyValue"
				:min="min",
				:max="max"
				:step="step"
				@input="updateRange($event.target.value)"
		)
</template>

<script>
	import FormField from "./FormField.vue";
	import debounce from "throttle-debounce/debounce";

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
			},
			simple: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			prettyValue () {
				return Math.floor(this.value) === this.value ? this.value : this.value.toFixed(2);
			}
		},
		data () {
			return {
				innerValue: this.value,
				snapValue: debounce(150, function () {
					this.innerValue = this.value;
				})
			};
		},
		watch: {
			value () { this.snapValue(); }
		},
		methods: {
			updateRange (input) {
				const value = Number(input);
				if (Number.isNaN(value)) { return; }

				this.innerValue = value;
				const roundedValue = Math.round(value / this.step) * this.step;
				this.$emit("input", roundedValue);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	

	.form-range {
		display:grid;
		grid-template-columns: 5.5ch 1fr 6ch;
		grid-gap:0.5em;
		margin-right:-0.5em;
	}
	.input-range {
		width:100%;
	}
	.input-range:first-child {
		grid-column-start: 1;
	}
	.input-range:last-child {
		grid-column-end: 4;
	}

	.input-text {
		border:0;
		text-align:left;
		padding-left:0.5em;
	}

	.input-range {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: transparent; /* Otherwise white in Chrome */
	}

	.input-range::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	.input-range:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

	.input-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1em;
		width: 1em;
		border-radius: 50%;
		background: $light-accent;
		cursor: pointer;
		margin-top: -0.25em;
	}
	.input-range::-moz-range-thumb {
		height: 1em;
		width: 1em;
		border-radius: 50%;
		background: $light-accent;
		cursor: pointer;
		margin-top: -0.25em;
		box-shadow:0;
		border:0;
	}

	.input-range::-webkit-slider-runnable-track {
		width: 100%;
		height: 0.5em;
			border-radius:0.5em;
		cursor: pointer;
		background: $dim-accent;
	}

	.input-range::-moz-range-track {
		width: 100%;
		height: 0.5em;
		border-radius:0.5em;
		cursor: pointer;
		background: $dim-accent;
	}

	.input-text::-webkit-inner-spin-button,
	.input-text::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.input-text {
		-moz-appearance:textfield;
	}

	@media all and (max-width:800px) {
		.input-range {
			margin: 0.5em 0;
		}
		.input-range::-webkit-slider-thumb {
			height: 2em;
			width: 2em;
			margin-top:-0.5em;
		}
		.input-range::-moz-range-thumb {
			height: 2em;
			width: 2em;
			margin-top:-0.5em;
		}
		.input-range::-webkit-slider-runnable-track {
			height:1em;
		}
		.input-range::-moz-range-track {
			height:1em;
		}
	}
</style>
