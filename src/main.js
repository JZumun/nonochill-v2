import {createApp } from "vue";
import App from "./App.vue";
import Hotkey from "v-hotkey3";
import router from "router/router";
import store from "store/Store";


const app = createApp(App);
app.use(store);
app.use(router);
app.use(Hotkey);

app.mount("#app");
