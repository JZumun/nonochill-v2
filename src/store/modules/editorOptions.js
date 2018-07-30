import api from "api/api";
import { ACTION_START_EDITOR } from "store/actions";
import { random } from "utils/RandomUtils";

export const ACTION_UPLOAD = "action:upload:upload";
export default {
	namespaced: true,
	state () {
		return {
			size: random(5, 20),
			colors: random(1, 5),
			file: null,
			loading: false,
			errorMessage: null
		};
	},
	mutations: {
		randomize (state) {
			state.size = random(5, 20);
			state.colors = random(1, 5);
		},
		setSize (state, value) {
			state.size = parseInt(value);
		},
		setColors (state, value) {
			state.colors = parseInt(value);
		},
		setFile (state, value) {
			state.file = value;
		},
		setLoading (state, value) {
			state.loading = value;
		},
		setError (state, value) {
			state.errorMessage = value;
		}
	},
	actions: {
		upload ({ dispatch, commit, state }) {
			commit("setLoading", true);
			commit("setError", null);

			const formData = new window.FormData();
			formData.set("size", state.size);
			formData.set("colors", state.colors);
			formData.set("image", state.file, state.file.name);

			return api({
				url: "image",
				method: "post",
				headers: {
					"accept": "application/json",
					"Accept-Language": "en-US,en;q=0.8",
					"Content-Type": `multipart/form-data; boundary=${formData._boundary}`
				},
				data: formData
			}).then(data => dispatch(ACTION_START_EDITOR, {
				...data,
				board: data.colors,
				colors: data.scheme.length
			}, { root: true }))
				.catch(e => commit("setError", e.message))
				.then(_ => commit("setLoading", false));
		}
	}
};
