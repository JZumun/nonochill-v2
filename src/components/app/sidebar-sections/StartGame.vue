<template lang="pug">
	#start-game
		fieldset
			legend Options
			range-field( name="Size" :min="2" :max="20" :value="size" @input="setSize" )
			range-field( name="Colors" :min="1" :max="5" :value="colors" @input="setColors")
			range-field( name="Density" :min="0.6" :max="0.95" :step="0.05" :value="density", @input="setDensity" )
			.buttons.
				#[button.secondary( @click.prevent="randomize") Randomize]
				#[force-router-link(to="/game") Start New Game]
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
	import { ACTION_START_GAME } from "store/actions";
	import { ACTION_LOAD_GAME } from "store/modules/localsave";

	export default {
		components: { RangeField, LoadingSymbol, ForceRouterLink },
		data () {
			return {
				code: "",
				closed: false
			};
		},
		computed: {
			...mapState({
				hasSavedGame: state => state.localSave.hasSavedGame,
				loadGameLoading: state => state.shortCode.loading,
				loadGameErrorMessage: state => state.shortCode.errorMessage
			}),
			...mapState("options/start", [ "size", "density", "colors" ])
		},
		methods: {
			...mapMutations("options/start",["randomize", "setSize", "setDensity", "setColors"]),
			startWithCode () {
				// Need to support oldstyle codes.
				this.$router.push("/")
				if (this.code.length > 20) {
					this.$router.push("game", _ => {
						this.$nextTick(_ => this.$nextTick(_ => {
							this.$store.dispatch(ACTION_START_GAME, this.code);
							this.code = "";
						}))
					})
				} else {
					this.$router.push(`/game/${this.code}`);
				}
			}
		}
	};
</script>
