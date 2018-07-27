import api from "api/api";
import { ACTION_START_EDITOR } from "store/actions";
export const ACTION_UPLOAD = "action:upload:upload";

export default {
	state: {
		loading: false,
		errorMessage: null,
		file: null,
		size: 5
	},
	mutations: {
		setLoading (state, value) {
			state.loading = value;
		},
		setError (state, value) {
			state.errorMessage = value;
		}
	},
	actions: {
		[ACTION_UPLOAD] ({ dispatch, commit }, formData) {
			commit("setLoading", true);
			commit("setError", null);
			return api({
				url: "image",
				method: "post",
				headers: {
					"accept": "application/json",
					"Accept-Language": "en-US,en;q=0.8",
					"Content-Type": `multipart/form-data; boundary=${formData._boundary}`
				}
			}).then(data => dispatch(ACTION_START_EDITOR, {
				...data,
				board: data.colors,
				colors: data.scheme.length
			}))
				.catch(e => commit("setError", e.message))
				.then(_ => commit("setLoading", false));
		}
	}
};
