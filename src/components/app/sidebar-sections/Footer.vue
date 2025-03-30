<template lang="pug">
    footer
        span
            | Created by&nbsp;
            a.author(href="https://jzumun.ph")
                img(src="https://www.jzumun.ph/images/profile.png")
                | JZumun
            | &nbsp;using #[a(href="https://vuejs.org/") Vue JS].
        span Sound effects from #[a(href="https://pixabay.com/sound-effects/") Pixabay].
        span Music by #[a(href="https://cchound.com/post/173227390201/source-bandcamp-author-aerocity-cc-by-can") Aerocity] under #[a(href="https://creativecommons.org/licenses/by/4.0/") CCBY].
        span(v-if="bgAuthor") 
            | Background image by  
            a(:href="actualBgAuthorLink" target="_blank") {{bgAuthor}}
            | &nbsp;on  
            a(href="https://unsplash.com?utm_source=nonochill&utm_medium=referral") Unsplash.
        span Hosted on #[a(href="https://github.com/JZumun/nonochill-v2") Github].
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            bgAuthor: state => state.background.author.name,
            bgAuthorLink: state => state.background.author.url
        }),
        actualBgAuthorLink() {
            return this.bgAuthorLink + "?utm_source=nonochill&utm_medium=referral";
        }
    }
}
</script>
<style lang="stylus" scoped>
    footer
        font-size 0.5em
        opacity 0.5
        padding 2em
        margin-top auto
        text-align left

    span
        display inline-block
        line-height 2

        &::after
            content " "
            width: 1ch
            display inline-block

    img
        width 2em
        vertical-align middle
        border-radius 50%
        margin-right 0.5ch
        // margin-bottom: -1em

    .author
        white-space nowrap
</style>