const express = require('express')
const Product = require('../models/taskModel')
const router = express.Router()
const {getTasks, getTask, createTask, updateTask, deleteTask} = require('../controllers/taskController')

// all products
router.get('/', getTasks);

//  by id
router.get('/:id', getTask);

// create a product
router.post('/', createTask);

//update a product
router.put('/:id', updateTask);

//delete product
router.delete('/:id', deleteTask);

module.exports = router

