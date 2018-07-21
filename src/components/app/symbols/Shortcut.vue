<template lang="pug">
    span.shortcut(v-show="shortcut")
        slot
</template>

<script>
    import { mapState } from "vuex";
    export default {
        computed: mapState("accessibility/shortcut",{
            shortcut: s => s.show
        })
    }
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"
	
	.shortcut
		background $dark-accent
		display flex
		padding 0.25em
		font-size 0.5em
		align-items center
		justify-content center
</style>

