<template lang="pug">
	button(@click="route")
		slot
</template>

<script>
	import { random } from "utils/RandomUtils";
	export default {
		props: {
			to: String
		},
		methods: {
			route () {
				this.$router.push(`${random(1, 5)}`).then(_ => this.$router.replace(this.to));
			}
		}
	};
</script>
