const express = require("express");

const Post = require("../models/post");

const multer = require('multer');

const route = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '_' + Date.now() + '.' + ext);
    }
});


// console.log('it\'s comming from before app');
route.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    //const post = req.body;
    const url = req.protocol + '://' + req.get("host"); // create full url
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images" + req.file.filename // multer property: req.file.filename return filename
    });
    console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            //postId: createdPost._id
            post: {
                ...createdPost, //make a copy of the existing post object
                id: createdPost._id,
                // title: createdPost.title,
                // content: createdPost.content,
                // imagePath: createdPost.imagePath
            }
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