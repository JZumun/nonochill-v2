<template lang="pug">
    footer
        span
            | Created by&nbsp;
            a.author(href="https://github.com/JZumun")
                img(src="https://avatars3.githubusercontent.com/u/10479613")
                | JZumun
            | &nbsp;using #[a(href="https://vuejs.org/") Vue JS].&nbsp;
        
        span(v-if="bgAuthor") 
            | Background image by&nbsp; 
            a(:href="actualBgAuthorLink" target="_blank") {{bgAuthor}} 
            | &nbsp;from&nbsp; 
            a(href="https://unsplash.com?utm_source=nonochill&utm_medium=referral") Unsplash.
            | &nbsp;
        span Music by #[a(href="https://cchound.com/post/173227390201/source-bandcamp-author-aerocity-cc-by-can") Aerocity] under #[a(href="https://creativecommons.org/licenses/by/4.0/") CCBY].&nbsp;
        span Hosted on #[a(href="https://github.com/JZumun/nonochill-v2") Github].&nbsp;
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            bgAuthor: state => state.background.author.name,
            bgAuthorLink: state => state.background.author.link
        }),
        actualBgAuthorLink() {
            return this.backgroundlink + "?utm_source=nonochill&utm_medium=referral";
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
        text-align center

    span
        display inline-block
        white-space nowrap

    img
        width 2em
        vertical-align middle
        border-radius 50%
        margin-right 0.5ch

    .author
        white-space nowrap
</style>