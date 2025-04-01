<template lang="pug">
	fieldset
		legend Solver #[sup (experimental)]
		.solver
			button(v-if="!loading" @click="run") Find Solution
			button(v-if="loading" @click="cancel") Cancel
			loading-icon(:display="loading")
			span.message(v-if="message")  {{message}}
</template>

<script lang="js">
import { SET_TILES, SET_TILE, RESET_BOARD } from "store/mutations";
import {mapState, mapMutations } from "vuex";
import LoadingIcon from "components/app/symbols/Loading.vue";

import {solve} from "utils/game/Solver";

const delay = (ms) => new Promise(r=>setTimeout(r, ms));
export default {
	components: {LoadingIcon},
	data() {
		return {
			break: false,
			message: null,
			loading: false,
			unsolvedRows: null,
			unsolvedCols: null,
		}
	},
	computed: {
		...mapState(["rules", "board"])
	},
	methods: {
		...mapMutations({
				set: SET_TILES,
				setOne: SET_TILE,
				clear: RESET_BOARD
		}),
		cancel() {
			this.break = true;
		},
		clearText() {
			this.break = false;
			this.loading = false;
			this.unsolvedRows = null;
			this.unsolvedCols = null;
			this.message = null;
		},
		async run() {
			this.clearText();
			this.loading = true;
			this.message = "Calculating"
			this.clear();
			await this.$nextTick();
			await delay(500);
			try {
				for (const moves of solve(this.rules)) {
					for (const move of moves) {
						if (this.break) {
							throw new Error("Cancelled");
						}
						if (this.board[move.tile.x][move.tile.y] == move.next) {
							continue;
						}
						this.setOne(move);
						await delay(10);
					}
					await delay(250);
				}
				this.loading = false
				this.message = "Solved!";
			} catch (err) {;
				this.loading = false;
				this.message = err.message;
				this.unsolvedRows = err.unsolvedRows;
				this.unsolvedCols = err.unsolvedColumns;
			}
		}
	},
	watch: {
		rules() {
			this.clearText();
		}
	}
}
</script>

<style lang="stylus" scoped>
sup 
small
	font-size 0.5em
p
	margin 0
.solver > *
	display inline
</style>