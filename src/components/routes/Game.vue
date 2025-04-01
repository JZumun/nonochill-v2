<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState } from "vuex";
	import { ACTION_START_GAME } from "store/actions";
	import { ACTION_LOAD_FROM_SHORTCODE } from "store/modules/shortcode";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	import { count } from "utils/ArrayUtils";
	import generateGame from "utils/game/GenerateGame";
	import generateRule, {generateRuleFromBoard} from "utils/game/GenerateRule";

	const readyOrNot = context => _ => (context.errorMessage || (context.ready = true));
	export default {
		data() {
			return {
				loadingMessage: "Loading Puzzle"
			}
		},
		props: {
			saved: {
				type: Boolean,
				default: false
			},
			id: {
				type: String,
				default: null
			}
		},
		mixins: [interactiveBoard, routeMixin],
		computed: {
			...mapState("options/start", ["size", "colors"]),
			...mapState({
				shortCode: state => state.shortCode.code,
				errorMessage: state => state.shortCode.errorMessage
			})
		},
		watch: {
			shortCode (value) {
				if (value != null) {
					this.$router.replace(`/game/${value}`);
				}
			}
		},
		methods: {
			async load () {
				this.ready = false;
				this.loadingMessage = "Loading Puzzle"

				if (this.saved) { return this.startFromStorage(); }
				if (this.id !== null) { return this.startFromCode(); }

				this.loadingMessage = "Generating Puzzle"
				await this.$nextTick();
				await new Promise(r=>setTimeout(r, 250))

				const o = this;
				const board = generateGame(o.size, o.colors);
				const rules = generateRuleFromBoard(board);
				await this.$store.dispatch(ACTION_START_GAME, {
					size: this.size,
					colors: this.colors,
					rules
				}).then(readyOrNot(this));
			},
			startFromStorage () {
				this.$store.dispatch(ACTION_LOAD_GAME)
					.then(readyOrNot(this));
			},
			startFromCode () {
				if (this.id === this.$store.state.shortCode.code) {
					readyOrNot(this);
				}
				this.$store.dispatch(ACTION_LOAD_FROM_SHORTCODE, this.id)
					.then(readyOrNot(this));
			}
		}
	};
</script>
