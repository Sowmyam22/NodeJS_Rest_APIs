const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const { signup, login, getUserStatus, updateUserStatus } = require('../controllers/auth');
const { updatePost } = require('../controllers/feed');

router.put('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid E-Mail!')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email already exists!');
            }
          })
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ], signup);

router.post('/login', login);

router.get('/status', isAuth, getUserStatus);

router.patch('/status', isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ], updateUserStatus);

module.exports = router;