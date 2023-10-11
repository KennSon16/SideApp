const Task = require('../models/taskModel')
const asyncHandler = require('express-async-handler')

// gets all the task
const getTasks = asyncHandler(async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// gets a single task by id
const getTask = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        // res.status(500).json({message: error.message})
    }
})

// create a task
const createTask = asyncHandler(async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// update a task
const updateTask = asyncHandler(async(req,res)=> {
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if(!task){
            res.status(404)
            throw new Error(`cannot finds any product with id: ${id}`);
        }
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// delete a task
const deleteTask = asyncHandler(async(req,res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            res.status(404)
            throw new Error(`cannot finds any task with id: ${id}`);
        }
        res.status(200).json(task)
         
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getTasks, 
    getTask, 
    createTask,
    updateTask,
    deleteTask,
}