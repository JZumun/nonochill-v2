<template lang="pug">
	#start-game
		form(@submit.prevent="start")
			fieldset
				legend Options
				range-field( name="Size" :min="2" :max="20" v-model.number="size" )
				range-field( name="Colors" :min="1" :max="5" v-model.number="colors" )
				range-field( name="Density" :min="0.6" :max="0.95" :step="0.05" v-model.number="density" )
				button Start New Game
		form(@submit.prevent="startWithCode")
			fieldset
				legend Load Game
				small paste code below
				textarea(v-model="code" spellcheck="false" onclick="this.focus();this.select()" rows="5")
				button Load
</template>

<script>
	import RangeField from "components/app/form/RangeField.vue"

	import generateGame from "utils/game/GenerateGame";
	import generateRule from "utils/game/GenerateRule";
	import { deserialize } from "utils/game/Serializer";

	import { ACTION_START_GAME } from "store/actions"
	import  { count } from "utils/ArrayUtils"

	export default {
		components: { RangeField },
		data() {
			return {
				size: 5,
				density: 0.6,
				colors: 3,
				code: "",
				closed: false
			}
		},
		methods: {
			start() {
				const board = generateGame(this.size,this.colors,this.density)
				const rules = {
					column: count(this.size).map( col => generateRule( board.map( row => row[col] ) ) ),
					row: count(this.size).map( row => generateRule( board[row] ) )
				}
				this.$store.dispatch(ACTION_START_GAME,{
					size: this.size,
					colors: this.colors,
					rules
				});
			},
			startWithCode() {
				let options;
				try {
					options = deserialize(this.code)
				} catch( e ) {
					this.code = "FAULTY CODE";
				}
				this.$store.dispatch(ACTION_START_GAME,{
					size: options.width,
					rules: {
						row: options.row,
						column: options.column
					},
					colors: options.colors,
					scheme: options.colorScheme
				})
				this.code = ""
			}
		}
	}
</script>
