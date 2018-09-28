import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL;
console.log(`API_URL set to ${API_URL}`);

export default (options) => axios({
	method: "post",
	responseType: "json",
	validateStatus: status => status === 200 || status === 400,
	headers: {
		"Content-Type": "application/json"
	},
	...options,
	...{ url: API_URL + (options.url ? `/${options.url}` : "") }
}).then(({ data }) => {
	if (data.success) return data;
	else throw new Error(data.reason || "An Error Occured");
});
