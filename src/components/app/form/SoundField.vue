<template lang="pug">
	.audio-control
		.audio-control-play(@click="toggle" v-html="icon")
		range-field.audio-control-volume(
			:min="0",
			:max="1.0",
			:step="0.05",
			:value="volume",
			@input="setVolume"
			simple
		)
</template>

<script>
	import volumeButton from "assets/volume.svg";
	import volumeOffButton from "assets/volume-off.svg";
	import RangeField from "components/app/form/RangeField.vue";

	export default {
		components: {RangeField},
		props: {
			muted: { type: Boolean, default: false },
			volume: { type: Number, default: 0.5 }
		},
		computed: {
			icon() { return this.muted ? volumeOffButton : volumeButton },
		},
		methods: {
			toggle() { this.$emit("toggle") },
			setVolume(value) { this.$emit("volume", value) }
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~styles/variables.styl"
	.audio-control 
		display grid
		grid-template-columns auto 1fr
		grid-gap 0.5em
		align-items center
		margin-top 0
		margin-right 1em

	.audio-control-play 
		height 1.5em
		width 1.5em
		display block
		color $light-accent
	
	.audio-control-volume 
		margin-top 0
	
</style>
