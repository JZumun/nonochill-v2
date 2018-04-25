<template lang="pug">
	fieldset.audio
		legend Music
		small Background Music
		sound-field(
			:muted="!musicPlaying",
			:volume="musicVolume"
			@toggle="toggleMusic"
			@volume="setMusicVolume"
		)
		small Sound Effects
		sound-field(
			:muted="effectsMuted",
			:volume="effectsVolume",
			@toggle="toggleEffects",
			@volume="setEffectsVolume"
		)
</template>

<script>
	import SoundField from "components/app/form/SoundField.vue";
	import { mapState, mapMutations } from "vuex";
	import { SET_EFFECTS_VOLUME, SET_MUSIC_VOLUME, PLAY_MUSIC, MUTE_EFFECTS } from "store/modules/soundManager";

	export default {
		components: {SoundField},
		methods: {
			...mapMutations({
				playMusic: PLAY_MUSIC,
				muteEffects: MUTE_EFFECTS,
				setEffectsVolume: SET_EFFECTS_VOLUME,
				setMusicVolume: SET_MUSIC_VOLUME
			}),
			toggleMusic() {
				this.playMusic( !this.musicPlaying );
			},
			toggleEffects() {
				this.muteEffects( !this.effectsMuted );
			}
		},
		computed: mapState({
			effectsVolume: state => state.soundManager.effects.volume,
			musicVolume: state => state.soundManager.music.volume,
			musicPlaying: state => state.soundManager.music.playing,
			effectsMuted: state => state.soundManager.effects.muted
		}),
		mounted() {
			if (window.Audio) {
				this.playMusic();
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
