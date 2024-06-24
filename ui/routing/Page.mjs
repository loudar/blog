import {create} from "https://fjs.targoninc.com/f.js";

export class Page {
    static container = document.body;
    static get toasts() {
        const toasts = document.getElementById("toasts");
        if (!toasts) {
            Page.initialize();
            return Page.toasts;
        } else {
            return toasts;
        }
    }

    static get popups() {
        const popups = document.getElementById("popups");
        if (!popups) {
            Page.initialize();
            return Page.popups;
        } else {
            return popups;
        }
    }

    static empty() {
        Page.container.innerHTML = "";
        Page.initialize();
    }

    static initialize() {
        Page.container.appendChild(create("div").id("toasts").build());
        Page.container.appendChild(create("div").id("popups").build());
    }

    static load(page, params, router) {
        Page.empty();
        const pageData = Page.pageMap[page];
        if (!pageData) {
            console.error(`Page ${page} not found`);

            return;
        }
        import(this.componentBasePath + "pages/" + pageData.path + this.componentExtension).then((module) => {
            const component = module[pageData.component].render(params, router);
            Page.container.appendChild(component);
        });
    }

    static componentBasePath = "../components/";
    static componentExtension = ".mjs";

    static pageMap = {
        "articles": {
            path: "articles",
            component: "ArticlesComponent"
        },
        "article": {
            path: "article",
            component: "ArticleComponent"
        },
    };
}