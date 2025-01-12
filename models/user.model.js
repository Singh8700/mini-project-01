const mongoose = require("mongoose")

const userDetails =  new mongoose.Schema({
        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            minlength: [3, 'Username Must Be at least 3 characters long']
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [3, 'Username Must Be at least 3 characters long']
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            minlength: [10, 'Username Must Be at least 10 characters long']
        },
        password: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: [6, 'Username Must Be at least 6 characters long']
        },
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref : "userPosts"
        }]
    })


const userModel = mongoose.model('user',userDetails)

module.exports = userModel