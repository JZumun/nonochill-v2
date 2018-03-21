<template lang="pug">
	#start-game
		form(@submit.prevent="start")
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" v-model.number="size" )
				range-field( name="Colors" :min="1" :max="5" v-model.number="colors" )
				range-field( name="Density" :min="0.6" :max="0.95" :step="0.05" v-model.number="density" )
				.buttons.
					#[button.secondary( @click.prevent="randomize") Randomize]
					#[button Start New Game]
		form(@submit.prevent="startFromStorage", :disabled="!hasSavedGame")
			fieldset
				legend Load From Save
				button(v-if="hasSavedGame") Load Game
				small(v-else) There is currently no saved game.
		form(@submit.prevent="startWithCode")
			fieldset
				legend Load From Code
				small paste code below
				textarea(v-model="code" spellcheck="false" onclick="this.focus();this.select()" rows="5")
				.buttons
					button Load
					loading-symbol(:display="loadGameLoading")
</template>

<script>
	import RangeField from "components/app/form/RangeField.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import generateGame from "utils/game/GenerateGame";
	import generateRule from "utils/game/GenerateRule";
	import { deserialize } from "utils/game/Serializer";

	import { mapState } from "vuex";
	import { ACTION_START_GAME } from "store/actions";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";
	import { count } from "utils/ArrayUtils";
	import { random } from "utils/RandomUtils";

	export default {
		components: { RangeField, LoadingSymbol },
		data () {
			return {
				size: random(5, 20),
				density: random(0.6, 0.95, 0.05),
				colors: random(1, 5),
				code: "",
				closed: false
			};
		},
		computed: mapState({
			hasSavedGame: state => state.localSave.hasSavedGame,
			loadGameLoading: state => state.shortCode.loading
		}),
		methods: {
			randomize () {
				this.size = random(5, 20);
				this.density = random(0.6, 0.95, 0.05);
				this.colors = random(1, 5);
			},
			start () {
				const board = generateGame(this.size, this.colors, this.density);
				const rules = {
					column: count(this.size).map(col => generateRule(board.map(row => row[col]))),
					row: count(this.size).map(row => generateRule(board[row]))
				};
				this.$store.dispatch(ACTION_START_GAME, {
					size: this.size,
					colors: this.colors,
					rules
				});
			},
			startWithCode () {
				this.$store.dispatch(ACTION_START_GAME, this.code);
				this.code = "";
			},
			startFromStorage () {
				this.$store.dispatch(ACTION_LOAD_GAME);
			}
		}
	};
</script>
