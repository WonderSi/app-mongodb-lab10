require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("./models/Article");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected — seeding…");

    await Article.deleteMany({});

    const docs = [
      {
        title: "Node.js в научных вычислениях",
        authors: ["Иван Петров", "Анна Маркова"],
        content: "Полный текст статьи #1…",
        tags: ["node", "computing"],
        reviews: [
          { name: "Алексей", text: "Полезная статья!", rating: 8 },
          { name: "Мария", text: "Надо больше примеров.", rating: 7 },
        ],
      },
      {
        title: "Микросервисы для журналов",
        authors: ["Анна Маркова"],
        content: "Полный текст статьи #2…",
        tags: ["microservices", "architecture"],
        reviews: [{ name: "Дмитрий", text: "Отлично.", rating: 9 }],
      },
      {
        title: "GraphQL против REST",
        authors: ["Сергей Ким"],
        content: "Полный текст статьи #3…",
        tags: ["graphql", "api"],
      },
      {
        title: "Машинное обучение на JavaScript",
        authors: ["Ольга Иванова", "Сергей Ким"],
        content: "Полный текст статьи #4…",
        tags: ["ml", "javascript"],
      },
      {
        title: "Тестирование Node-приложений",
        authors: ["Иван Петров"],
        content: "Полный текст статьи #5…",
        tags: ["testing", "node"],
      },
      {
        title: "Введение в TypeScript",
        authors: ["Александр Смирнов", "Елена Кузнецова"],
        content: "Полный текст статьи #6…",
        tags: ["typescript", "javascript"],
        reviews: [
          { name: "Виктор", text: "Очень доступно объяснено!", rating: 9 },
          { name: "Светлана", text: "Хотелось бы больше примеров.", rating: 8 },
        ],
      },
      {
        title: "Контейнеризация с Docker",
        authors: ["Мария Лебедева"],
        content: "Полный текст статьи #7…",
        tags: ["docker", "devops"],
        reviews: [{ name: "Игорь", text: "Полезно для новичков.", rating: 9 }],
      },
      {
        title: "REST API с Express",
        authors: ["Дмитрий Орлов"],
        content: "Полный текст статьи #8…",
        tags: ["express", "api"],
      },
      {
        title: "Обработка данных с Pandas",
        authors: ["Ольга Смирнова", "Николай Иванов"],
        content: "Полный текст статьи #9…",
        tags: ["python", "data"],
      },
      {
        title: "Юнит-тестирование в JavaScript",
        authors: ["Елена Кузнецова"],
        content: "Полный текст статьи #10…",
        tags: ["testing", "javascript"],
        reviews: [
          { name: "Артём", text: "Много практических советов!", rating: 8 },
        ],
      },
    ];

    await Article.insertMany(docs);
    console.log("Seed OK");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();
