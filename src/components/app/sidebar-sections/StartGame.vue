<template lang="pug">
	#start-game
		fieldset
			legend Options
			range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize" )
			range-field( name="Colors" :min="1" :max="5" :value="colors" @input="setColors")
			.buttons.
				#[button.secondary( @click.prevent="randomize") Randomize]
				#[force-router-link(to="/game" @click="startGameLoading=true") Start New Game]
				#[loading-symbol(:display="startGameLoading")]
		fieldset
			legend Load From Save
			force-router-link(v-if="hasSavedGame", to="/game/saved") Load Game
			small(v-else) There is currently no saved game.
		fieldset
			legend Load From Code
			small paste code below
			textarea(v-model="code" spellcheck="false" onclick="this.focus();this.select()" rows="5")
			.buttons
				button(@click="startWithCode") Load
				loading-symbol(:display="loadGameLoading", :error="loadGameErrorMessage")
</template>

<script>
	import ForceRouterLink from "components/app/ForceRouterLink.vue";
	import RangeField from "components/app/form/RangeField.vue";
	import LoadingSymbol from "components/app/symbols/Loading.vue";

	import { deserialize } from "utils/game/Serializer";

	import { mapState, mapMutations } from "vuex";
	import { ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	export default {
		components: { RangeField, LoadingSymbol, ForceRouterLink },
		data () {
			return {
				code: "",
				closed: false,
				startGameLoading: false
			};
		},
		computed: {
			...mapState({
				hasSavedGame: state => state.localSave.hasSavedGame,
				loadGameLoading: state => state.shortCode.loading,
				loadGameErrorMessage: state => state.shortCode.errorMessage
			}),
			...mapState("options/start", ["size", "colors"])
		},
		methods: {
			...mapMutations("options/start", ["randomize", "setSize", "setColors"]),
			startWithCode () {
				// Need to support oldstyle codes.
				this.$router.push("/");
				if (this.code.length > 40) {
					this.$router.push("game", _ => {
						this.$nextTick(_ => this.$nextTick(_ => {
							this.$store.dispatch(ACTION_START_GAME_FROM_LONGCODE, this.code);
							this.code = "";
						}));
					});
				} else {
					this.$router.push(`/game/${this.code}`);
					this.code = "";
				}
			}
		},
		watch: {
			"$route" () {
				this.startGameLoading = false;
			}
		}
	};
</script>
