import Vue from "vue";
import VueRouter from "vue-router";

import TitleScreen from "components/routes/TitleScreen.vue";
import Game from "components/routes/Game.vue";
import Tutorial from "components/routes/Tutorial.vue";
import Editor from "components/routes/Editor.vue";
import NotFound from "components/routes/NotFound.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", component: TitleScreen },
	{ path: "/game", component: Game },
	{ path: "/game/saved", component: Game, props: { saved: true }},
	{ path: "/tutorial", component: Tutorial },
	{ path: "/game/:id", component: Game, props: true },
	{ path: "/editor", component: Editor },
	{ path: "*", component: NotFound }
];

const router = new VueRouter({
	routes,
	base: import.meta.env.BASE_URL || "/"
});

export default router;
