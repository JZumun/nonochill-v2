import Vue from "vue";
import axios from "axios";
import { ACTION_START_GAME } from "store/actions";

const API_URL = process.env.API_URL;
console.log(`API_URL set to ${API_URL}`);

const sendPayload = (payload) => axios({
	method: "post",
	url: API_URL,
	responseType: "json",
	data: payload,
	validateStatus: status => status == 200 || status == 400,
	headers: {
		"Content-Type": "application/json"
	}
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

export default {
		state: {
			code: null,
			loading: false
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
			}
		},
		actions: {
			[ACTION_GENERATE_SHORTCODE] ({commit, getters}) {
				commit(SET_LOADING, true);
				return sendPayload({
						game: getters.serialization
					})
					.then(processResponse(data => {
						commit(SET_SHORT_CODE, data.id)
					}))
					.catch(e => console.error(e))
					.then(_=>commit(SET_LOADING, false));
			},
			[ACTION_LOAD_FROM_SHORTCODE] ({dispatch, commit}, code) {
				commit(SET_LOADING, true);
				return axios.get(`${API_URL}/${code}`)
								.then(processResponse(data => dispatch(ACTION_START_GAME, data.game)))
								.then(() => commit(SET_SHORT_CODE, code))
								.catch(e => console.error(e))
								.then(_ => commit(SET_LOADING, false));
			}
		}
}
