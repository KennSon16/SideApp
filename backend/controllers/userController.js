const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');


// register a user
const createUser = asyncHandler(async(req,res) => {
    try {
        const {email, username, password} = req.body;
        const hashpassword = bcrypt.hashSync( password )
        const user = await User.create( {email, username, password:hashpassword} )
        res.status(200).json(user)
    } catch (error) {
        res.status(409);
        throw new Error(error.message)
    }
})

// logging in a user
const loginUser = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            res.status(400).json({message: "Please sign up first"});
        }
        
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password, user.password
        );
        if(!isPasswordCorrect){
            res.status(400).json({message:"Incorrect username or password"});
        }
        const {password, ...others} = user._doc;
        res.status(200).json({others});
    } catch (error) {
        res.status(400).json({ message: "User already exist"});
    }
});

//get user
const getUsers = asyncHandler(async(req,res) => {
    if (process.env.NODE_ENV === "development"){
        try {
            const user = await User.find({});
            res.status(200).json(user)
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    }
})


// get a user by id
const getUser = asyncHandler(async(req,res) => {
    if (process.env.NODE_ENV === "development"){
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            res.status(200).json(user)
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    } else {
        console.log("No Access");
        res.status(403)
    }
})

module.exports = {
    createUser,
    getUser,
    getUsers,
    loginUser,
}