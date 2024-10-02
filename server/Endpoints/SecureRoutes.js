const express = require('express');
const router = express.Router();

const {updateUser} = require('./../Controllers/SecureControllers');
const ValidationMiddleware = require('../Middlewares/ValidationMiddleware');

router.put("updateUser",ValidationMiddleware("updateUser"),updateUser);

module.exports = router;