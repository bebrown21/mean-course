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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
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

app.get('/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    post ?
      res.status(200).json(post) :
      res.status(404).json({ message: 'Post not found' });
  });
});

app.put('/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      res.status(200).json({ message: 'Update Successful!' });
    })
});

app.delete('/posts/:id', (req, res, next) =>
{
  Post.deleteOne({ _id: req.params.id})
    .then(result => {
      res.status(200).json({ message: 'Post Deleted!' });
    });
});

module.exports = app;
