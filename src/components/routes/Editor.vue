<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState, mapActions } from "vuex";
	import { ACTION_START_EDITOR, ACTION_CREATOR_UPDATE_RULES } from "store/actions";
	
	export default {
		mixins: [interactiveBoard, routeMixin],
		computed: {
			...mapState("options/editor", ["size", "colors", "file"]),
			...mapState({
					shortCode: state => state.shortCode.code,
					errorMessage: state => state.shortCode.errorMessage
				})
		},
		// watch: {
		// 	shortCode(value) {
		// 		if (value != null) {
		// 			this.$router.replace(`/editor/${value}`);
		// 		}
		// 	}
		// },
		methods: {
			load() {
				this.ready = false;
				
				let options = !this.file ? [ACTION_START_EDITOR, {
					size: this.size,
					colors: this.colors
				}] : ["options/editor/upload"];


				this.$store.dispatch(...options).then(_ => this.ready = true);
			}
		},
		watch: {
			board(val) {
				this.$store.dispatch(ACTION_CREATOR_UPDATE_RULES);
			}
		}
	}
</script>
