import Vue from "vue";
import axios from "axios";
import { ACTION_START_GAME_FROM_LONGCODE } from "store/actions";
import api from "api/api";

export const ACTION_GENERATE_SHORTCODE = "action:short-code:generate";
export const ACTION_LOAD_FROM_SHORTCODE = "action:short-code:load";
export const CLEAR_SHORTCODE = "mutation:short-code:clear";
export const SET_SHORT_CODE = "mutation:short-code:set";
const SET_LOADING = "mutation:short-code:loading-signal";
const SET_ERROR = "mutation:short-code:set-error";

export default {
		state: {
			code: null,
			loading: false,
			errorMessage: null
		},
		mutations: {
			[SET_SHORT_CODE] (state, value) {
				state.code = value;
			},
			[CLEAR_SHORTCODE] (state) {
				state.code = null;
			},
			[SET_LOADING] (state, value) {
				state.loading = value;
			},
			[SET_ERROR] (state, value) {
				if (value != null) { console.warn(value); }
				state.errorMessage = value;
			}
		},
		actions: {
			[ACTION_GENERATE_SHORTCODE] ({commit, getters}) {
				commit(SET_LOADING, true);
				commit(SET_ERROR, null);
				return api({
						data: {game: getters.serialization}
					})
					.then(data => commit(SET_SHORT_CODE, data.id))
					.catch(e => commit(SET_ERROR, e.message))
					.then(_=>commit(SET_LOADING, false));
			},
			[ACTION_LOAD_FROM_SHORTCODE] ({dispatch, commit}, code) {
				if (code == null || code.trim().length == 0) {
					return commit(SET_ERROR, "invalid game id");
				}
				commit(SET_LOADING, true);
				commit(SET_ERROR, null);
				return api({
					url: `${code}`,
					method: "get"
				}).then(data => dispatch(ACTION_START_GAME_FROM_LONGCODE, data.game))
					.then(() => commit(SET_SHORT_CODE, code))
					.catch(e => commit(SET_ERROR, e.message))
					.then(_ => commit(SET_LOADING, false));
			}
		}
}
