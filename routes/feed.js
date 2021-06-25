const express = require('express');

const { getPosts } = require('../controllers/feed');

const router = express.Router();

//GET => /feed/posts
router.get('/posts', getPosts);

module.exports = router;