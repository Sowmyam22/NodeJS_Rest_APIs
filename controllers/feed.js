const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then(posts => {
      res.status(200).json({
        message: 'Fetched all posts!',
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.createPost = (req, res, next) => {
  // create post in db

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed! Please check the required fields!');
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error('No image provided!');
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req.body;
  // const imageUrl = req.file.path;
  const imageUrl = req.file.path.replace("\\" ,"/");

  Post.create({
    title: title,
    content: content,
    imageUrl: imageUrl,
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

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find the post!');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Post festched',
        post: post
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}