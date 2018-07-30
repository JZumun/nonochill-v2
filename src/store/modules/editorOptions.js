import api from "api/api";
import { ACTION_START_EDITOR } from "store/actions";
import { random } from "utils/RandomUtils";
import loading from "store/mixins/loading";

export const ACTION_UPLOAD = "action:upload:upload";
export default {
	namespaced: true,
	state () {
		return {
			...loading.state,
			size: random(5, 20),
			colors: random(1, 5),
			file: null
		};
	},
	mutations: {
		...loading.mutations,
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
		}
	},
	actions: {
		...loading.actions,
		upload ({ dispatch, commit, state }) {
			return dispatch("load", _ => {
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
				}, { root: true }));
			});
		}
	}
};
