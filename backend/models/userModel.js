const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            unique: true,
            require: [true, "Please enter email"],
        },
        username:{
            type:String,
            dunique: true,
            require: [true, "Please enter username"]
        },
        password:{
            type:String,
            require: [true, "Please enter password"]
        },
        task: [
            {
            type: mongoose.Types.ObjectId,
            ref: "Task",
            },
        ],
    },
);

const User = mongoose.model('User',userSchema)

module.exports = User;