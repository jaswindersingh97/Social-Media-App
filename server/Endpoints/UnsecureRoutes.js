const express = require('express');
const router = express.Router();

const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

const {
    getUser,
    getPost, 
    getComments,
    getLikes,
    getFullPost,
    getPostsByUserId,
    getFollowers,
    getFollowing
    } = require('./../Controllers/UnsecureController');

//User based routes
router.get("/users/:userId",ValidationMiddleware("getUser"),getUser);   // get a specific user

//Post based routes
router.get("/posts/:postId",ValidationMiddleware("getPost"),getPost);   // get a specific post without populating either comment or like
router.get("/posts/comments/:postId",ValidationMiddleware("getComments"),getComments);   // get comments to a specific post
router.get("/posts/likes/:postId",ValidationMiddleware("getLikes"),getLikes);   // get likes to a specific post
router.get("/fullposts/:postId",ValidationMiddleware("getFullPost"),getFullPost);   // get a specific post with populating both comments and likes
router.get("/posts/user/:userId",ValidationMiddleware("getPostsByUserId"),getPostsByUserId);    // get all the post of a specific user

//Following based routes
router.get("/users/followers:userId",ValidationMiddleware("getFollowers"),getFollowers);    // to get followers for a particular user
router.get("/users/following:userId",ValidationMiddleware("getFollowing"),getFollowing);    // to get Following for a particular user

module.exports = router;