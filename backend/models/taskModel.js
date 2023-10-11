const mongoose = require("mongoose")

const taskSchema = mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, "Please enter the task name"]
        },
        description: {
            type: String,
            required: [true, "Please enter the task description"]
        },
        completed:{
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task',taskSchema)

module.exports = Task;