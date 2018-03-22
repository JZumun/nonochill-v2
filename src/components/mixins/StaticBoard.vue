<template lang="pug">
	.main-game-board
		game-board(:board="board", :rules="rules")
</template>

<script>
	import GameBoard from "components/game/GameBoard.vue";
	import { deserialize } from "utils/game/Serializer";
	export default {
		components: {GameBoard},
		computed: {
			options() { return deserialize(this.serialization) },
			rules() {
				return {
					row: this.options.row,
					column: this.options.column
				}
			}
		}
	}
</script>
