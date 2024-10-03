const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('./../Controllers/AuthControllers');
const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

router.post("/register",ValidationMiddleware("register"),registerUser); // Creating a user
router.post("/login",ValidationMiddleware("login"),loginUser);  // Login the user

module.exports = router;