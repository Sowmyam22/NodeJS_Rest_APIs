const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');

const router = express.Router();

const { signup, login } = require('../controllers/auth');

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

module.exports = router;