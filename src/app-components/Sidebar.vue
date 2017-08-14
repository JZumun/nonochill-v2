<template lang="pug">
	section#sidebar.sidebar.page-section
		h1.game-title NonoChill#[sup v.2]
		start-game
		game-options
</template>

<script>
	import SidebarSection from "./sidebar-sections/SidebarSection.vue"
	import StartGame from "./sidebar-sections/StartGame.vue"
	import GameOptions from "./sidebar-sections/GameOptions.vue"

	export default {
		components: {SidebarSection, StartGame, GameOptions}
	}
</script>
