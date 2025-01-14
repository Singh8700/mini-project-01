const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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


    // data save middleware
userDetails.pre("save", async function (next){
    const user = this

    if(!user.isDirectModified("password")){
        next()
    }
    try{

        const saltRound = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password,saltRound)
        user.password = hashPassword

    }catch (e){
        next(e)
    }
})

const userModel = mongoose.model('user',userDetails)

module.exports = userModel