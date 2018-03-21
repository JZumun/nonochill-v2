import Vue from "vue";
import axios from "axios";
import { ACTION_START_GAME } from "store/actions";

const API_URL = process.env.API_URL;
console.log(`API_URL set to ${API_URL}`);

const sendPayload = (options) => axios({
	method: "post",
	url: API_URL,
	responseType: "json",
	validateStatus: status => status == 200 || status == 400,
	headers: {
		"Content-Type": "application/json"
	},
	...options
})

const processResponse = (
		onSuccess,
		onFailure=data=>{ throw new Error(data.reason) }
	) => ({data}) => {
		if (data.success) { return onSuccess(data) }
		else { return onFailure(data) }
}


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
				return sendPayload({
						data: {game: getters.serialization}
					})
					.then(processResponse(data => commit(SET_SHORT_CODE, data.id)))
					.catch(e => commit(SET_ERROR, e.message))
					.then(_=>commit(SET_LOADING, false));
			},
			[ACTION_LOAD_FROM_SHORTCODE] ({dispatch, commit}, code) {
				if (code == null || code.trim().length == 0) {
					return commit(SET_ERROR, "invalid game id");
				}
				commit(SET_LOADING, true);
				commit(SET_ERROR, null);
				return sendPayload({
					url: `${API_URL}/${code}`,
					method: "get"
				}).then(processResponse(data => dispatch(ACTION_START_GAME, data.game).then(() => commit(SET_SHORT_CODE, code))))
					.catch(e => commit(SET_ERROR, e.message))
					.then(_ => commit(SET_LOADING, false));
			}
		}
}
