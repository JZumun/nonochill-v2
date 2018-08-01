<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import routeMixin from "../mixins/routeMixin";
	import { mapState } from "vuex";
	import { ACTION_START_GAME } from "store/actions";
	import { ACTION_LOAD_FROM_SHORTCODE } from "store/modules/shortcode";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	import { count } from "utils/ArrayUtils";
	import generateGame from "utils/game/GenerateGame";
	import generateRule from "utils/game/GenerateRule";

	const readyOrNot = context => _ => (context.loadingErrorMessage || (context.ready = true));

	export default {
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
		data () {
			return {
				errorMessage: null
			};
		},
		computed: {
			...mapState("options/start", ["size", "density", "colors"]),
			...mapState({
				shortCode: state => state.shortCode.code,
				loadingErrorMessage: state => state.shortCode.errorMessage
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
			load () {
				this.ready = false;

				if (this.saved) { return this.startFromStorage(); }
				if (this.id !== null) { return this.startFromCode(); }

				const o = this;
				const board = generateGame(o.size, o.colors, o.density);
				const rules = {
					column: count(o.size).map(col => generateRule(board.map(row => row[col]))),
					row: count(o.size).map(row => generateRule(board[row]))
				};
				this.$store.dispatch(ACTION_START_GAME, {
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
					console.log("Same route");
					readyOrNot(this);
				}
				this.$store.dispatch(ACTION_LOAD_FROM_SHORTCODE, this.id)
					.then(readyOrNot(this));
			}
		},
		watch: {
			loadingErrorMessage (val) {
				if (val == null) this.errorMessage = null;
				else this.errorMessage = "Unable to load game: " + val;
			}
		}
	};
</script>
