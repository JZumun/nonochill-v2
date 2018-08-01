<template lang="pug">
	board-container
		game-board(:board="board", :rules="rules")
</template>

<script>
	import GameBoard from "components/game/GameBoard.vue";
	import BoardContainer from "components/app/BoardContainer.vue";
	import { deserialize } from "utils/game/Serializer";
	export default {
		components: { GameBoard, BoardContainer },
		computed: {
			options () { return deserialize(this.serialization); },
			rules () {
				return {
					row: this.options.row,
					column: this.options.column
				};
			}
		}
	};
</script>
