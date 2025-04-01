<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState, mapMutations } from "vuex";
	import { ACTION_START_GAME, ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
	import { ACTION_LOAD_FROM_SHORTCODE } from "store/modules/shortcode";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	import { count } from "utils/ArrayUtils";
	import generateGame from "utils/game/GenerateGame";
	import generateRule, {generateRuleFromBoard} from "utils/game/GenerateRule";

	const readyOrNot = context => _ => (context.errorMessage || (context.ready = true));
	export default {
		data() {
			return {
				loadingMessage: "Loading Puzzle",
				errorMessage: null
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
				longCode: state => state.longCode.code,
				shortCode: state => state.shortCode.code,
				shortCodeErrorMessage: state => state.shortCode.errorMessage
			})
		},
		watch: {
			shortCode (value) {
				if (value != null) {
					this.$router.replace(`/game/${value}`);
				}
			},
			shortCodeErrorMessage(value) {
				this.errorMessage = value;
			}
		},
		methods: {
			...mapMutations("longCode", {
				"setLongCode": "setCode"
			}),
			async load () {
				console.log("load");
				this.ready = false;
				this.errorMessage = null;
				this.loadingMessage = "Loading Puzzle"

				if (this.saved) { return this.startFromStorage(); }
				if (this.id !== null) { return this.startFromCode(); }
				if (this.longCode != null) { return this.startFromLongCode(); }

				this.loadingMessage = "Generating Puzzle";
				await this.$nextTick();
				await new Promise(r=>setTimeout(r, 250))

				const o = this;
				const board = await generateGame(o.size, o.colors);
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
					readyOrNot(this)();
				}
				this.$store.dispatch(ACTION_LOAD_FROM_SHORTCODE, this.id)
					.then(readyOrNot(this));
			},
			startFromLongCode() {
				try {
					this.$store.dispatch(ACTION_START_GAME_FROM_LONGCODE, this.longCode)
					this.ready = true;
				} catch (err) {
					this.errorMessage = "Code is invalid";
				}
				this.setLongCode(null);
			}
		}
	};
</script>
