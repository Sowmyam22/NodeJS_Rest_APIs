const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { name, email, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            return User.create({
                name: name,
                email: email,
                password: hashedPassword,
                status: 'I am New!'
            })
        })
        .then(result => {
            res.status(200).json({ message: 'User created!', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
}