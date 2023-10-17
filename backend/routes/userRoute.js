const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const { createUser, getUsers, getUser, loginUser } = require('../controllers/userController');

// creating a user
router.post('/register', createUser);
// get users or a user by id
router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/login', loginUser)

module.exports = router;