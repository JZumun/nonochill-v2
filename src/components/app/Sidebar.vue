<template lang="pug">
	section#sidebar.sidebar.page-section
		h1.game-title #[router-link(to="/") NonoChill#[sup v.2]]
		sidebar-section.section(title="Play" :closed="!section[0]" @toggle="toggle(0)")
			start-game
			tutorial-section
		sidebar-section.section(title="Level Editor" :closed="!section[1]" @toggle="toggle(1)")
			create-game
		sidebar-section.section(title="Options", :closed="!section[2]" @toggle="toggle(2)")
			game-options
		slot
</template>

<script>
	import SidebarSection from "./sidebar-sections/SidebarSection.vue";
	import StartGame from "./sidebar-sections/StartGame.vue";
	import CreateGame from "./sidebar-sections/StartEditor.vue";
	import GameOptions from "./sidebar-sections/GameOptions.vue";
	import TutorialSection from "./sidebar-sections/TutorialSection.vue";

	const init = Object.freeze([true, false, false]);
	const active = Object.freeze([false, false, true]);
	const initOrActive = path => path === "/" ? init : active;

	export default {
		components: { SidebarSection, StartGame, GameOptions, CreateGame, TutorialSection },
		data () {
			return {
				section: initOrActive(this.$route.path)
			};
		},
		methods: {
			toggle (section) {
				this.section = this.section.map((val, i) => i === section ? !val : false);
			}
		},
		watch: {
			"$route" (to, from) {
				this.section = initOrActive(this.$route.path);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	

	.sidebar  
		background-color $dark-accent 
		color $translucent-white 
		overflow-y auto 
		display flex 
		flex-direction column 
	
	.section + .section 
		margin-top: 0.5em
	 
	.game-title  
		font-size 1.5em 
		padding 0.5em 
		text-align center 
		margin 0 
		background $dark-accent
		color $translucent-white
	 
	.game-title sup  
		font-size 0.5em 
		font-weight bold 

	.game-title a 
		text-decoration none
	
</style>
