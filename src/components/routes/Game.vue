<script>
	import interactiveBoard from "../mixins/InteractiveBoard.vue";
	import { mapState } from "vuex";
	import { ACTION_START_GAME } from "store/actions";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	import { count } from "utils/ArrayUtils";
	import generateGame from "utils/game/GenerateGame";
	import generateRule from "utils/game/GenerateRule";

	export default {
		beforeRouteEnter (to, from, next) {
			next(vm =>vm.start());
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
		mixins: [interactiveBoard],
		computed: {
			...mapState("options/start", ["size", "density", "colors"])
		},
		methods: {
			start() {
				if (this.saved) { return this.startFromStorage() }
				if (this.id !== null) { return this.startFromCode() }

				const o = this;
				const board = generateGame(o.size, o.colors, o.density);
				const rules = {
					column: count(o.size).map(col => generateRule( board.map(row => row[col]))),
					row: count(o.size).map(row => generateRule(board[row]))
				};
				this.$store.dispatch(ACTION_START_GAME, {
					size: this.size,
					colors: this.colors,
					rules
				}).then(_ => this.ready = true);
			},
			startFromStorage() {
				this.$store.dispatch(ACTION_LOAD_GAME)
					.then(_ => this.ready = true);

			},
			startFromCode() {
				this.$store.dispatch(ACTION_START_GAME, this.id)
					.then(_ => this.ready = true);
			}
		}
	}
</script>
