const equalAndValued = (a,b) => a != null && a === b;
export default {
	props: {
		id: Object,
		highlight: Object,
	},
	computed: {
		highlighted() {
			return equalAndValued(this.highlight.x, this.id.x)
					|| equalAndValued(this.highlight.y, this.id.y)
		}
	},
	methods: {
		setHighlight(event) { this.$emit("highlight",this.id); }
	}
}
