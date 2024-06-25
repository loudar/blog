import {computedSignal, create, signalMap, store} from "https://fjs.targoninc.com/f.js";
import {CommonTemplates} from "../common.mjs";

export class ArticlesComponent {
    static render(params, router) {
        const articles = store().get("articles");
        const shownArticles = computedSignal(articles, list => {
            return list.filter(a => !a.draft);
        });

        return create("div")
            .classes("page", "articles")
            .children(
                CommonTemplates.socialBar(),
                create("h1")
                    .text("Articles")
                    .build(),
                signalMap(shownArticles, create("div").classes("article-list", "flex-v"),
                        article => ArticlesComponent.articleInList(article))
            ).build();
    }

    static articleInList(article) {
        const fileCreated = new Date(article.fileCreated).toLocaleDateString();

        return create("a")
            .classes("article-list-item", "flex", "space-between")
            .href(`/article/${encodeURIComponent(article.title)}`)
            .onclick(e => {
                if (e.button !== 0) {
                    return;
                }
                e.preventDefault();
                window.router.navigate(`/article/${encodeURIComponent(article.title)}`)
            })
            .children(
                create("span")
                    .classes("article-list-item-title")
                    .text(article.title)
                    .build(),
                create("span")
                    .classes("article-date")
                    .text(fileCreated)
                    .build()
            ).build();
    }
}