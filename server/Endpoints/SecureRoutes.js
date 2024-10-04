const express = require('express');
const router = express.Router();

const {
    profile,
    updateUser,
    UpdatePassword,
    deleteUser,
    CreatePost,
    DeletePost,
    UpdatePost,
    AddComment,
    LikePost,
    followUser,
    privacy,
    } = require('./../Controllers/SecureControllers');

const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');
// const RequireAuthentication = require('../Middlewares/RequireAuthentication');
// router.use(RequireAuthentication);

// User based routes
router.get("/users/profile",profile);   // getting the logged in profile
router.put("/Users/update",ValidationMiddleware("updateUser"),updateUser);  // Updating the Logged in users Profile
router.delete("/users/delete",deleteUser);  //Deleting the user

// Post based routes
router.post("/posts",ValidationMiddleware("CreatePost"),CreatePost);    // Creating a post
router.delete("/posts/:postId",ValidationMiddleware("DeletePost"),DeletePost);  // Deleting a post or a comment 
router.put("/posts/:postId",ValidationMiddleware("UpdatePost"),UpdatePost); // Updating a post

// Comment and Like Management
router.post("/comments/:postId",ValidationMiddleware("AddComment"),AddComment); // creating a comment
router.patch("/like/:postId",ValidationMiddleware("LikePost"),LikePost);    // liking a post

// Follow System
router.post("/users/follow/:memberId",ValidationMiddleware("followUser"),followUser) // to follow and unfollow a user

// Settings routes
router.patch("/Users/settings/UpdatePassword",ValidationMiddleware("updatePassword"),UpdatePassword);    // Updating the  Password
router.patch("/Users/settings/privacy",ValidationMiddleware("privacy"),privacy);    // Updating the profile type 

module.exports = router;