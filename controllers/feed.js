const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: '1',
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
    res.status(422).json({
      message: 'Validation Failed!',
      errors: errors.array()
    })
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
    .catch(err => console.log(err));
}