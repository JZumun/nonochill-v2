import Vue from "vue";
import VueRouter from "vue-router";

import TitleScreen from "components/routes/TitleScreen.vue";
import Game from "components/routes/Game.vue";
import Editor from "components/routes/Editor.vue";
import NotFound from "components/routes/NotFound.vue";

Vue.use(VueRouter)

const routes = [
	{ path: "/", component: TitleScreen },
	{ path: "/game", component: Game },
	{ path: "/game/saved", component: Game, props: { saved: true } },
	{ path: "/game/:id", component: Game, props: true },
	{ path: "/editor", component: Editor },
	{ path: "*", component: NotFound }
]

const router = new VueRouter({
  routes,
	base: process.env.BASE || "/"
})

export default router;
