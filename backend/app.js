const express = require('express');

const app = express();

app.use('/posts', (req, res, next) => {
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
