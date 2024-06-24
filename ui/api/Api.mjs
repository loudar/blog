export class Api {
    static async getArticles() {
        const response = await fetch("/articles");
        return await response.json();
    }
}