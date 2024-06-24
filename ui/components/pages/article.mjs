import {computedSignal, create, store} from "https://fjs.targoninc.com/f.js";
import {CommonTemplates} from "../common.mjs";

export class ArticleComponent {
    static render(params, router) {
        const articles = store().get("articles");
        const article = computedSignal(articles, list => list.find(article => article.title === decodeURIComponent(params.title)));
        const content = computedSignal(article, article => {
            document.title = article ? article.title : "Article not found";
            return article ? article.content : "Article not found";
        });
        const fileCreated = computedSignal(article, article => article ? new Date(article.fileCreated).toLocaleDateString() : new Date());

        return create("div")
            .classes("page", "article")
            .children(
                CommonTemplates.socialBar(),
                create("a")
                    .classes("back-button")
                    .href("/")
                    .text("Back to articles")
                    .build(),
                create("span")
                    .classes("article-date")
                    .text(fileCreated)
                    .build(),
                ArticleComponent.markdownToHtml(content)
            ).build();
    }

    static markdownToHtml(markdown) {
        const converter = new window.showdown.Converter();
        const html = computedSignal(markdown, markdown => converter.makeHtml(markdown).replaceAll(" href", ' target="_blank" href'));

        return create("div")
            .classes("article-content")
            .html(html)
            .build();
    }
}