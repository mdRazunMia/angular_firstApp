const express = require("express");

const Post = require("../models/post");

const route = express.Router();


// console.log('it\'s comming from before app');
route.post("", (req, res, next) => {
    //const post = req.body;
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            //postId: createdPost._id
        });
    });
});

route.get("", (req, res, next) => {
    // res.send('This is the first middleware.');
    // console.log('First middleware');
    // next();
    // const posts = [{
    //         id: "fadf12421l",
    //         title: "First server-side post",
    //         content: "This is coming from the server"
    //     },
    //     {
    //         id: "ksajflaj132",
    //         title: "Second server-side post",
    //         content: "This is coming from the server"
    //     }
    // ];
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'post fetched successfully',
                posts: documents
            });
        });
    // res.status(200).json({
    //     message: 'post fetched successfully',
    //     posts: posts
    // });
});

route.delete("/:id", (req, res, next) => {
    //console.log("Before deleted the database: " + req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(
        resutl => {
            //console.log(resutl);
            res.status(200).json({
                message: 'Post deleted'
            });
        }
    );
});

module.exports = route;
