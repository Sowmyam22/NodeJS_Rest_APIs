const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: '2',
      title: 'First Book',
      content: 'Some dummy content!',
      imageUrl: 'images/train.jpg',
      creator: {
        name: 'Sowmya'
      },
      createdAt: new Date()
    }]
  });
};

exports.createPost = (req, res, next) => {
  // create post in db

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed! Please check the required fields!');
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  Post.create({
    title: title,
    content: content,
    imageUrl: 'images/train.jpg',
    creator: {
      name: 'Sowmya'
    },
  })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created Successfully!',
        post: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}