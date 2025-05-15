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

app.get("/api/articles/by-date", async (req, res) => {
  const { from, to } = req.query;
  const query = {};

  if (from || to) {
    const postedAt = {};
    if (from && !isNaN(Date.parse(from))) {
      postedAt.$gte = new Date(from);
    }
    if (to && !isNaN(Date.parse(to))) {
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1);
      postedAt.$lt = toDate;
    }
    if (Object.keys(postedAt).length > 0) {
      query.postedAt = postedAt;
    }
  }

  const articles = await Article.find(query).sort({ postedAt: -1 });
  res.json(articles);
});

app.get("/api/articles/top", async (_, res) => {
  const articles = await Article.aggregate([
    {
      $addFields: {
        rating: { $avg: "$reviews.rating" },
        reviewsCount: { $size: "$reviews" },
      },
    },
    { $sort: { rating: -1, reviewsCount: -1 } },
    {
      $project: {
        _id: 1,
        title: 1,
        authors: 1,
        postedAt: 1,
        rating: 1,
        reviews: "$reviewsCount",
      },
    },
  ]);
  res.json(articles);
});

app.get("/api/articles/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  article ? res.json(article) : res.status(404).end();
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
    const authors = await Article.distinct("authors");
    res.json(authors.sort());
});

app.post("/api/articles", async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
});

app.delete("/api/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.end();
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
