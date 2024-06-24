import {create, signalMap, store} from "https://fjs.targoninc.com/f.js";

export class ArticlesComponent {
    static render(params, router) {
        const articles = store().get("articles");

        return create("div")
            .classes("page", "articles")
            .children(
                create("h1")
                    .text("Articles")
                    .build(),
                signalMap(articles, create("div").classes("article-list"),
                        article => ArticlesComponent.articleInList(article))
            ).build();
    }

    static articleInList(article) {
        return create("div").classes("article-list-item")
            .children(
                create("a")
                    .classes("article-list-item-title")
                    .href(`/article/${encodeURIComponent(article.title)}`)
                    .text(article.title)
                    .build()
            ).build();
    }
}