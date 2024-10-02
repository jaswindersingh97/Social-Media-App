const express = require('express');
const router = express.Router();

const {getUser} = require('./../Controllers/UnsecureController');

router.get("/users/:userId",getUser);

module.exports = router;