require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/api/articles", async (_, res) => {
  const list = await Article.find().sort({ postedAt: -1 });
  res.json(list);
});

app.get("/api/articles/search", async (req, res) => {
  const { title = "" } = req.query;
  const regex = new RegExp(title, "i");
  const list = await Article.find({ title: regex });
  res.json(list);
});

app.get("/api/articles/author/:name", async (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  const list = await Article.find({ authors: regex });
  res.json(list);
});

app.get("/api/authors", async (_, res) => {
  const articles = await Article.find({}, "authors -_id");
  let allAuthors = [];
  for (const article of articles) {
    if (Array.isArray(article.authors)) {
      allAuthors = allAuthors.concat(article.authors);
    }
  }
  const uniqueAuthors = Array.from(new Set(allAuthors)).sort();

  res.json(uniqueAuthors);
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
