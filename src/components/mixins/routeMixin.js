export default {
	created() { this.load() },
	watch: {
		"$route": function(val) {
			this.load()
		}
	}
}
