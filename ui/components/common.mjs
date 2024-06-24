import {create} from "https://fjs.targoninc.com/f.js";

export class CommonTemplates {
    static socialBar() {
        return create("div")
            .classes("flex")
            .children(
                CommonTemplates.socialLink("https://targoninc.com", "Projects", "targoninc", ["inverted-icon"]),
                CommonTemplates.socialLink("https://github.com/loudar", "GitHub", "github"),
                CommonTemplates.socialLink("https://twitter.com/dreamreviver", "Twitter", "twitter"),
            ).build();
    }

    static socialLink(link, name, icon, iconClasses = []) {
        return create("a")
            .classes("social-link")
            .href(link)
            .target("_blank")
            .children(
                CommonTemplates.icon(icon, name, iconClasses),
                create("span")
                    .classes("social-link-text")
                    .text(name)
                    .build()
            ).build();
    }

    static icon(icon, name, iconClasses = []) {
        return create("img")
            .classes("icon", ...iconClasses)
            .src(`/images/icons/${icon}.svg`)
            .alt(name)
            .build();
    }

    static matIcon(icon, name) {
        return create("i")
            .classes("material-symbols-outlined")
            .text(icon)
            .title(name)
            .build();
    }
}