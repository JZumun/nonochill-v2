import Vue from "vue";
import App from "./App.vue";
import Hotkey from "v-hotkey";
import router from "router/router";
import store from "store/Store";
import { sync } from "vuex-router-sync";

sync(store, router);

Vue.use(Hotkey);
new Vue({
	router,
	el: "#app",
	render: h => h(App)
});
