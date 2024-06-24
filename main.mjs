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
        const fileCreated = new Date(fs.statSync(filePath).birthtimeMs);
        return {
            title: file.replaceAll(".md", ""),
            content,
            fileCreated
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
    res.sendFile(__dirname + '/ui/index.html');
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT || 3001}/`);
});