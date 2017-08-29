const equalAndValued = (a, b) => a != null && a === b;
export default {
	data () {
		return {
			highlight: {}
		};
	},
	methods: {
		clearHighlight () { this.highlight = {}; },
		setHighlight (tile) { this.highlight = tile; },
		isHighlighted ({ x, y }) {
			return equalAndValued(this.highlight.x, x) ||
				equalAndValued(this.highlight.y, y);
		}
	}
};
