const express = require('express');
const router = express.Router();

const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

const {
    getUser,
    getPost, 
    getPostsByUserId
    } = require('./../Controllers/UnsecureController');

//User based routes
router.get("/users/:userId",ValidationMiddleware("getUser"),getUser);

//Post based routes
router.get("/posts/:postId",ValidationMiddleware("getPost"),getPost);
router.get("/posts/user/:userId",ValidationMiddleware("getPostsByUserId"),getPostsByUserId);

module.exports = router;