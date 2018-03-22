<template lang="pug">
	button(@click="route")
		slot
</template>

<script>
	import {random} from "utils/RandomUtils";
	export default {
		props: {
			to: String
		},
		methods: {
			route() {
				console.log("hello");
				this.$router.push(`${random(1,5)}`,_=>this.$router.replace(this.to))

			}
		}
	}
</script>
