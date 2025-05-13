require('dotenv').config();
const mongoose = require('mongoose');
const Article  = require('./models/Article');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected — seeding…');

    await Article.deleteMany({});

    const docs = [
      {
        title: 'Node.js в научных вычислениях',
        authors: ['Иван Петров', 'Анна Маркова'],
        content: 'Полный текст статьи #1…',
        tags: ['node', 'computing'],
        reviews: [
          { name: 'Алексей', text: 'Полезная статья!', rating: 8 },
          { name: 'Мария',  text: 'Надо больше примеров.', rating: 7 }
        ]
      },
      {
        title: 'Микросервисы для журналов',
        authors: ['Анна Маркова'],
        content: 'Полный текст статьи #2…',
        tags: ['microservices', 'architecture'],
        reviews: [{ name: 'Дмитрий', text: 'Отлично.', rating: 9 }]
      },
      {
        title: 'GraphQL против REST',
        authors: ['Сергей Ким'],
        content: 'Полный текст статьи #3…',
        tags: ['graphql', 'api']
      },
      {
        title: 'Машинное обучение на JavaScript',
        authors: ['Ольга Иванова', 'Сергей Ким'],
        content: 'Полный текст статьи #4…',
        tags: ['ml', 'javascript']
      },
      {
        title: 'Тестирование Node-приложений',
        authors: ['Иван Петров'],
        content: 'Полный текст статьи #5…',
        tags: ['testing', 'node']
      }
    ];

    await Article.insertMany(docs);
    console.log('Seed OK');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();