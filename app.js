const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const sequelize = require('./util/database');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();

app.use(express.json()); //application/json

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message
    });
})

// sequelize.sync({ force: true })    // used to override the tables in the database
sequelize.sync()
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err))
