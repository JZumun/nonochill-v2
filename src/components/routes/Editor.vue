<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import { mapState, mapActions } from "vuex";
	import { ACTION_START_EDITOR, ACTION_CREATOR_UPDATE_RULES } from "store/actions";

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => vm.start());
		},
		mixins: [interactiveBoard],
		computed: {
			...mapState("options/editor", ["size", "colors"])
		},
		methods: {
			start() {
				this.$store.dispatch(ACTION_START_EDITOR, {
					size: this.size,
					colors: this.colors
				});
			}
		},
		watch: {
			board(val) {
				this.$store.dispatch(ACTION_CREATOR_UPDATE_RULES);
			}
		}
	}
</script>
