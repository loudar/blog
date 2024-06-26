import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "ui")));

const articleFolder = path.join(__dirname, "articles");
if (!fs.existsSync(articleFolder)) {
    fs.mkdirSync(articleFolder);
}
const articleFiles = fs.readdirSync(articleFolder);
const articles = articleFiles
    .filter(file => file.endsWith(".md"))
    .map(file => {
        const filePath = path.join(articleFolder, file);
        const content = fs.readFileSync(filePath, "utf8");
        const baseTitle = file.replaceAll(".md", "").replaceAll(".draft", "");
        const title = baseTitle.split("-")[2].trim();
        const dateBase = baseTitle.split("-")[1].trim();
        const date = new Date(dateBase.substring(0, 4), dateBase.substring(4, 6) - 1, dateBase.substring(6, 8));
        const id = baseTitle.split("-")[0].trim();
        const isDraft = file.includes("draft");
        return {
            title,
            id,
            content,
            draft: isDraft,
            fileCreated: date
        };
    });

app.use(express.json());
app.get("/articles", (req, res) => {
    res.json(articles);
});

app.get("/article/:title", (req, res) => {
    const article = articles.find(article => article.title === req.params.title);
    if (!article) {
        res.status(404).send("Article not found");
        return;
    }
    res.sendFile(__dirname + '/ui/index.html');
});

app.get('*', (req, res) => {
    let image = "/images/blog_image.png";
    let title = "ORANGE SPACE";
    let description = "a blog about many things";
    if (req.url.includes("/article/")) {
        image = "/images/article.png";
        const afterLastSlash = req.url.split("/").pop();
        title = articles.find(article => article.title === afterLastSlash).title;
        description = articles.find(article => article.title === afterLastSlash).content;
    }

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ORANGE SPACE</title>
    <meta property="og:image" content="${image}">
    <meta name="twitter:image" content="${image}">
    <meta property="og:title" content="${title}">
    <meta name="twitter:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta name="twitter:description" content="${description}">
    <link rel="apple-touch-icon" sizes="256x256" href="/images/blog_icon.png">
    <link rel="icon" type="image/png" sizes="256x256" href="/images/blog_icon.png">
    <link rel="stylesheet" href="/styles/reset.css">
    <link rel="stylesheet" href="/styles/style.css">
    <script src="https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/an-old-hope.min.css" rel="stylesheet">
    <script src="/index.mjs" type="module"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>

</body>
</html>`);
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT || 3001}/`);
});