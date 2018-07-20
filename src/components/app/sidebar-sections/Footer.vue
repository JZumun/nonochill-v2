<template lang="pug">
    footer
        span
            | Created by&nbsp;
            a.author(href="https://github.com/JZumun")
                img(src="https://avatars3.githubusercontent.com/u/10479613")
                | JZumun
            | &nbsp;using #[a(href="https://vuejs.org/") Vue JS].&nbsp;
        span Background images from #[a(href="https://unsplash.com/") Unsplash].&nbsp;
        span Music by #[a(href="https://cchound.com/post/173227390201/source-bandcamp-author-aerocity-cc-by-can") Aerocity] under #[a(href="https://creativecommons.org/licenses/by/4.0/") CCBY].&nbsp;
        span Hosted on #[a(href="https://github.com/JZumun/nonochill-v2") Github].&nbsp;
</template>
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