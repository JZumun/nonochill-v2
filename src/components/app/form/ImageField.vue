<template lang="pug">
	label.image-field
		input(
			type="file"
			accept=".png, .jpg, .jpeg"
			@change="setFile($event.target.files[0])"
		)
		span.dropbox
			img(alt="preview", v-if="preview.display" :src="preview.source")
			span(v-text="label")
</template>

<script>
	export default {
		data () {
			return {
				preview: {
					display: false,
					source: null
				},
				file: null
			};
		},
		computed: {
			label () {
				return this.file ? this.file.name : "Choose an image...";
			}
		},
		watch: {
			file () {
				this.preview.display = false;
				this.preview.source = null;
			}
		},
		methods: {
			setFile (file) {
				this.file = file;
				this.setPreview(file);
				this.$emit("change", file);
			},
			setPreview (file) {
				if (!file) { return; }
				const reader = new window.FileReader();
				reader.onload = _ => {
					this.preview.source = reader.result;
					this.preview.display = true;
				};
				reader.readAsDataURL(file);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	@import "~styles/variables"
	.image-field
		max-width 100%
	.image-field input
		width 0.1px
		height 0.1px
		opacity 0
		overflow hidden
		position absolute
		z-index -1
	.dropbox
		display block
		text-align center
		cursor pointer
		border 1px dashed $dim-accent
		padding 1em
		word-break break-all
	:focus + .dropbox 
		outline 1px dotted #000
		outline -webkit-focus-ring-color auto 5px
	img
		max-width 100%
		display block
	
</style>



