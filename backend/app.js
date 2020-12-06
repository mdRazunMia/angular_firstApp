const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const postRoutes = require("./routes/posts") // for routing the pages of post
const Post = require('./models/post');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://razun:Gi0HhPiTCJHbfHEb@cluster0.sczn8.mongodb.net/mean?retryWrites=true&w=majority')
    .then(
        () => {
            console.log('Successfully connect to the database');
        })
    .catch(
        () => {
            console.log('Connection failed');
        }
    );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("backend/images"))); //any request from /images will give access. by defult there is no access of the file anymore.

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postRoutes);
// mongodb password: Gi0HhPiTCJHbfHEb


module.exports = app;