const express = require('express');
const { body } = require('express-validator/check');

const { getPosts, createPost, getPost, updatePost } = require('../controllers/feed');

const router = express.Router();

//GET => /feed/posts
router.get('/posts', getPosts);

//POST => /feed/post
router.post('/post',
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 }),
    ],
    createPost);

router.get('/post/:postId', getPost);

router.put('/post/:postId',
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 }),
    ],
    updatePost);

module.exports = router;