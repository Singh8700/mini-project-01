const mongoose = require("mongoose")

const post = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date:{
        type:Date,
        default: Date.now
    },
    title:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        minlength: [3, 'title Must Be at least 3 characters long'],
        maxlenght:[200,'Title is under 200 characters']
    },
    post:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        minlength: [3, 'title Must Be at least 3 characters long']
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})

const userPost = mongoose.model("userPosts",post)

module.exports = userPost