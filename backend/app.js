const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://Brandon:Legacy123$@cluster0-wdjil.mongodb.net/node-angular?retryWrites=true',
  { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => {
    console.log('Connection to Database failed!',);
  })

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  /* Mongoose Model Post will "save" our entry to the DB in a collection default named the plural
     of our model name (posts) */
  post.save()
    .then((createdPost) => {
      res.status(201).json({
        message: 'Post added Successfully',
        postId: createdPost._id
      });
    });
});

app.get('/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json(
        {
          message: 'Posts fetched successfully',
          posts: documents
        });
    });
});

app.delete('/posts/:id', (req, res, next) =>
{
  Post.deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post Deleted!'});
    });
});

module.exports = app;
