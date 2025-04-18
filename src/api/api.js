import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log(`API_URL set to ${API_URL}`);

export default (options) => axios({
	method: "post",
	responseType: "json",
	validateStatus: status => status < 500,
	headers: {
		"Content-Type": "application/json"
	},
	...options,
	...{ url: API_URL + (options.url ? `/${options.url}` : "") }
}).then(({ data }) => {
	if (data.success) return data;
	else throw new Error(data.reason || "An Error Occured");
});
