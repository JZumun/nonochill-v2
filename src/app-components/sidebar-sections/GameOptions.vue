<template lang="pug">
	#game-options
		color-scheme
		game-history
		fieldset
			legend board
			small clearing the board will also reset your history.
			button(@click="clear") Clear Board
		fieldset
			legend Level Code
			small copy this code to share this level with others.
			textarea(v-model="code" readonly onclick="this.focus();this.select()" rows="8")
</template>

<script>
	import ColorScheme from "./ColorScheme.vue"
	import GameHistory from "./GameHistory.vue"

	import { RESET_BOARD } from "store/mutations"

	export default {
		components: {GameHistory, ColorScheme},
		data() {
			return {
				disabled: true,
				closed: true
			}
		},
		computed: {
			code() { return this.$store.getters.serialization }
		},
		methods: {
			clear() {
				this.$store.commit(RESET_BOARD);
			}
		}
	}
</script>
