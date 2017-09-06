import Vue from "vue";
import App from "./App.vue";
import Hotkey from "v-hotkey";

Vue.use(Hotkey);
new Vue({
	el: "#app",
	render: h => h(App)
});
