<template lang="pug">
	fieldset.audio
		legend Music
		audio(:src="audioSrc" loop preload type="audio/mp3" ref="audio")
		.controls
			.music-toggle(@click="toggle" v-html="icon")
			range-field.volume-toggle(:min="0" :max="1.0" :step="0.05" v-model="volume" simple)
</template>

<script>
	import audioSrc from "assets/sounds/escapism.mp3";
	import volumeButton from "assets/volume.svg";
	import volumeOffButton from "assets/volume-off.svg";
	import RangeField from "components/app/form/RangeField.vue";

	export default {
		components: {RangeField},
		data() {
			return {
				audioSrc,
				volume: 0.2,
				icon: volumeButton
			}
		},
		methods: {
			toggle() {
				if (this.player.paused) {
					this.player.play();
					this.icon = volumeButton;
				} else {
					this.player.pause();
					this.icon = volumeOffButton;
				}
			}
		},
		computed: {
			player() { return this.$refs.audio }
		},
		watch: {
			volume(val) {
				this.player.volume = val;
			}
		},
		mounted() {
			this.player.volume = this.volume;
			if (typeof this.player.play === "function") {
				this.player.play();
			}
		}
	}
</script>

<style>
	.controls {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap:0.5em;
		align-items: center;
		margin-top: 0;
		margin-right: 1em;
	}
	.music-toggle {
		height: 1.5em;
		width: 1.5em;
		display: block;
		color: var(--light-accent);
	}
	.volume-toggle {
		margin-top: 0;
	}
</style>
