const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('./../Controllers/AuthControllers');
const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

router.post("/register",ValidationMiddleware("register"),registerUser);
router.post("/login",ValidationMiddleware("login"),loginUser);

module.exports = router;