const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const sequelize = require('./util/database');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})

app.use('/feed', feedRoutes);

// sequelize.sync({ force: true })    // used to override the tables in the database
    sequelize.sync()
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err))
