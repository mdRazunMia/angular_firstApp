const express = require('express');
const bodyParser = require('body-parser');

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


// mongodb password: Gi0HhPiTCJHbfHEb
// console.log('it\'s comming from before app');
app.post("/api/posts", (req, res, next) => {
    // const post = req.body;
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save()
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req, res, next) => {
    // res.send('This is the first middleware.');
    // console.log('First middleware');
    // next();
    const posts = [{
            id: "fadf12421l",
            title: "First server-side post",
            content: "This is coming from the server"
        },
        {
            id: "ksajflaj132",
            title: "Second server-side post",
            content: "This is coming from the server"
        }
    ];
    res.status(200).json({
        message: 'post fetched successfully',
        posts: posts
    });
});

module.exports = app;