const express = require('express');
const router = express.Router();

const {
    profile,
    updateUser,
    UpdatePassword,
    deleteUser,
    CreatePost,
    } = require('./../Controllers/SecureControllers');
const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

// User based routes
router.get("/users/profile",profile);
router.put("/Users/update",ValidationMiddleware("updateUser"),updateUser);
router.patch("/Users/UpdatePassword",ValidationMiddleware("UpdatePassword"),UpdatePassword);
router.delete("/users/delete",deleteUser);

// Post based routes
router.post("/posts",ValidationMiddleware("CreatePost"),CreatePost);

module.exports = router;