<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState, mapActions } from "vuex";
	import { ACTION_START_EDITOR, ACTION_CREATOR_UPDATE_RULES } from "store/actions";

	export default {
		mixins: [interactiveBoard, routeMixin],
		computed: {
			...mapState("options/editor", ["size", "colors"]),
			...mapState({ shortCode: state => state.shortCode.code })
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
				this.$store.dispatch(ACTION_START_EDITOR, {
					size: this.size,
					colors: this.colors
				}).then(_ => this.ready = true);
			}
		},
		watch: {
			board(val) {
				this.$store.dispatch(ACTION_CREATOR_UPDATE_RULES);
			}
		}
	}
</script>
