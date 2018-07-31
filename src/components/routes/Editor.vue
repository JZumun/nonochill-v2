<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState, mapActions } from "vuex";
	import { ACTION_START_EDITOR, ACTION_CREATOR_UPDATE_RULES } from "store/actions";
	
	export default {
		mixins: [interactiveBoard, routeMixin],
		computed: {
			...mapState("options/editor", ["size", "colors", "file", "errorMessage"]),
		},
		methods: {
			load() {
				this.ready = false;
				
				let options = !this.file ? [ACTION_START_EDITOR, {
					size: this.size,
					colors: this.colors
				}] : ["options/editor/upload"];


				this.$store.dispatch(...options).then(_ => this.ready = !this.errorMessage);
			}
		},
		watch: {
			board(val) {
				this.$store.dispatch(ACTION_CREATOR_UPDATE_RULES);
			}
		}
	}
</script>
