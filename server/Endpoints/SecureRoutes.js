const express = require('express');
const router = express.Router();

const {profile,updateUser} = require('./../Controllers/SecureControllers');
const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

router.get("/users/profile",profile);
router.put("/Users/update",ValidationMiddleware("updateUser"),updateUser);

module.exports = router;