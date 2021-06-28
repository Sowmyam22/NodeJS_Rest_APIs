const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');

/** Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. **/
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const feedRoutes = require('./routes/feed');
const sequelize = require('./util/database');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();

// disk storage engine gives full control on storing files to disk
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },

    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() + '-' + file.originalname); // genrates the CORS Error
        cb(null, uuidv4());
    }
});

// Function to control which files are accepted
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json()); //application/json

//registering the multer
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

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
