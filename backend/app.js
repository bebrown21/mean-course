const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added Successfully'
  });
});

app.get('/posts', (req, res, next) => {
  posts = [
    {
      id: '1',
      title: 'First title',
      content: 'content'
    },
    {
      id: '2',
      title: 'Second title',
      content: 'content'
    }
  ]

  res.status(200).json(
    {
      message: 'Posts fetched successfully',
      posts: posts
    }
  );
});

module.exports = app;
