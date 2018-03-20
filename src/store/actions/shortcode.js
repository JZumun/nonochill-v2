import Vue from "vue";
import axios from "axios";
const API_URL = process.env.API_URL;

console.log(`API_URL set to ${API_URL}`);

export const ACTION_GENERATE_SHORTCODE = "action:generate-short-code";
export const ACTION_LOAD_FROM_SHORTCODE = "action:load-from-short-code";

import { ACTION_START_GAME } from "store/actions";
import { SET_SHORTID } from "store/mutations";
export default {
	[ACTION_GENERATE_SHORTCODE] ({dispatch, commit, getters}) {
		axios({
			method: "post",
			url: API_URL,
			responseType: "json",
			data: {
				game: getters.serialization
			},
			validateStatus(status) { return status == 200 || status == 400 },
			headers: {
				"Content-Type": "application/json"
			}
		}).then(({data}) => {
			if (data.success) {
				commit(SET_SHORTID, data.id);
			} else {
				console.log(`error occured`,data);
			}
		}).catch(e => console.log(e));
	},
	[ACTION_LOAD_FROM_SHORTCODE] ({dispatch, commit}, code) {
		axios.get(`${API_URL}/${code}`)
			.then(({data}) => {
				if (data.success) {
					dispatch(ACTION_START_GAME, data.game);
					Vue.nextTick(_=>{commit(SET_SHORTID, code)});
				} else {
					console.log(`error occured:`, data);
				}
			}).catch(e => console.log(e));
	}
}
