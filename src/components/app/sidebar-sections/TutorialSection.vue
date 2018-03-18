<template lang="pug">
	#tutorial
		form(@submit.prevent="start")
			fieldset
				legend Tutorial
				small This tutorial will teach you the basics of solving nonograms.
				button Play Tutorial
</template>

<script>
import { deserialize } from "utils/game/Serializer";
import { ACTION_START_GAME } from "store/actions";
export default {
	data () {
		return {
			game: "NC8vNC8vMi8vW1t7MSwxfXsxLDF9ezIsMX1dfFt7MSwyfXsyLDF9XXxbezEsMX17MSwxfV18W3sxLDF9ezEsMn1dXS8vW1t7MSw0fV18W3sxLDF9XXxbezEsMX17MSwxfV18W3syLDJ9ezEsMn1dXS8vIzNhMWEyZj8jQTM2NThDPyNlN2NiZGQ/I2ZmNzE4Nz8jOGRiMGUx"
		};
	},
	methods: {
		start () {
			const options = deserialize(this.game);
			this.$store.dispatch(ACTION_START_GAME, {
				size: options.width,
				rules: {
					row: options.row,
					column: options.column
				},
				colors: options.colors
			});
		}
	}
};
</script>

<style>
</style>
