<template lang="pug">
	fieldset.audio
		legend Music
		small Background Music
		sound-field(
			:muted="musicPaused",
			:volume="musicVolume"
			@toggle="toggleMusic(musicPaused)"
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
	import { mapState, mapMutations, mapActions } from "vuex";

	import workWithStorage from "utils/Storage.js";
	const saveToStorage = (key, value) => workWithStorage(
		storage => storage.setItem(key, JSON.stringify(value))
	);
	const loadFromStorage = (key, def) => workWithStorage(storage => {
		if (storage[key] && storage[key] !== "undefined") {
			return JSON.parse(storage[key]);
		} else return def;
	}, _ => def);

	export default {
		components: { SoundField },
		methods: {
			...mapMutations({
				muteMusic: "sounds/background/mute",
				setMusicVolume: "sounds/background/setVolume"
			}),
			...mapActions({
				playMusic: "sounds/background/play",
				pauseMusic: "sounds/background/pause",
				muteEffects: "sounds/muteEffects",
				setEffectsVolume: "sounds/setEffectsVolume"
			}),
			loadSettings () {
				this.setMusicVolume(loadFromStorage("sound.music.volume", 0.5));
				this.setEffectsVolume(loadFromStorage("sound.effects.volume", 0.5));
				this.muteEffects(loadFromStorage("sound.effects.muted"), false);
				this.toggleMusic(!loadFromStorage("sound.music.muted"), false);
			},
			toggleMusic (paused) {
				if (paused) {
					this.playMusic();
				} else {
					this.pauseMusic();
				}
			},
			toggleEffects () {
				this.muteEffects(!this.effectsMuted);
			}
		},
		computed: mapState({
			effectsVolume: state => state.sounds.blop.volume,
			musicVolume: state => state.sounds.background.volume,
			musicPaused: state => state.sounds.background.paused,
			effectsMuted: state => state.sounds.blop.muted
		}),
		mounted () {
			if (window.Audio) {
				this.playMusic();
				this.loadSettings();
			}
		},
		watch: {
			effectsVolume (val) { saveToStorage("sound.effects.volume", val); },
			musicVolume (val) { saveToStorage("sound.music.volume", val); },
			effectsMuted (val) { saveToStorage("sound.effects.muted", val); },
			musicPaused (val) { saveToStorage("sound.music.muted", val); }
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"
		
	.controls 
		display grid
		grid-template-columns auto 1fr
		grid-gap 0.5em
		align-items center
		margin-top 0
		margin-right 1em
	
	.music-toggle 
		height 1.5em
		width 1.5em
		display block
		color $light-accent
	
	.volume-toggle 
		margin-top 0
	
</style>
