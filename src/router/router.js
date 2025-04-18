import { createWebHashHistory, createRouter } from 'vue-router'

import TitleScreen from "components/routes/TitleScreen.vue";
import Game from "components/routes/Game.vue";
import Tutorial from "components/routes/Tutorial.vue";
import Editor from "components/routes/Editor.vue";
import NotFound from "components/routes/NotFound.vue";


const routes = [
	{ path: "/", component: TitleScreen },
	{ path: "/game", component: Game },
	{ path: "/game/saved", component: Game, props: { saved: true }},
	{ path: "/tutorial", component: Tutorial },
	{ path: "/game/:id", component: Game, props: true },
	{ path: "/editor", component: Editor },
	{ path: "/:pathMatch(.*)*", component: NotFound }
];

const router =createRouter({
	routes,
	base: import.meta.env.BASE_URL || "/",
	history: createWebHashHistory()
});

export default router;
