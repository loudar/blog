import {Router} from "./routing/Router.mjs";
import {routes} from "./routing/Routes.mjs";
import {Page} from "./routing/Page.mjs";
import {Api} from "./api/Api.mjs";
import {signal, store} from "https://fjs.targoninc.com/f.js";

store().set("articles", signal([]));
Api.getArticles().then(articles => store().setSignalValue("articles", articles.sort((a, b) => b.id - a.id)));

window.router = new Router(routes, async (route, params) => {
    console.log(`Route changed to ${route.path} with params:`, params);
    document.title = `${route.title}`;

    Page.load(route.path, params, window.router);
});
