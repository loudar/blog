import {computedSignal, create, store} from "https://fjs.targoninc.com/f.js";
import {CommonTemplates} from "../common.mjs";
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js';
import javascript
    from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/javascript.min.js';
import json from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/json.min.js';
import css from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/css.min.js';
import html from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/xml.min.js';

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

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

        const content = create("div")
            .classes("article-content")
            .html(html)
            .build();

        for (const codeInPres of content.querySelectorAll("pre code")) {
            const pre = codeInPres.parentElement;
            pre.classList.add("flex-v", "rendered");
            if (codeInPres.innerText.trim().startsWith("{{md:execute-js}}")) {
                const code = codeInPres.innerText.replaceAll("{{md:execute-js}}", "").trim();
                const result = eval(`"use strict";(() => {${code}})()`);
                codeInPres.innerHTML = "";
                codeInPres.classList.add("rendered");
                pre.insertBefore(CommonTemplates.button("content_copy", "Copy code", () => {
                    navigator.clipboard.writeText(code);
                }), pre.firstChild);
                codeInPres.appendChild(result);
            } else {
                pre.insertBefore(CommonTemplates.button("content_copy", "Copy code", () => {
                    navigator.clipboard.writeText(codeInPres.innerText);
                }), pre.firstChild);
                hljs.highlightElement(codeInPres);
            }
        }

        return content;
    }
}