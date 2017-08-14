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

<style>
	.sidebar {
		background-color:var(--dark-accent);
		color:var(--translucent-white);
		overflow-y:auto;
	}

	.sidebar *+* { margin-top:0.5rem; }

	.game-title {
		font-size:1.5em;
		padding:0.5em;
		text-align:center;
		margin:0;
		background: var(--dark-accent);
		color:var(--translucent-white);
	}
	.game-title sup {
		font-size:0.5em;
		font-weight:bold;
	}
</style>
