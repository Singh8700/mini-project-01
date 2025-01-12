const express = require("express")
// const userModel = require("../models/user.model")
const userPost = require("../postData/post.usermodel")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


const routes = express.Router()

routes.get("/",async(req,res)=>{
    const userData = await userPost.find()
    if(req.cookies.user){
        const token = await jwt.verify(req.cookies.user,process.env.JWT_SECRET)
        const userName = await userModel.findOne({_id:token.userId})
        // console.log(token,"user name is ", userName.fullName)
        // console.log(userData)
    // console.log("user data in profile page",data)
        return res.render("index",{
            cookies:req.cookies.user,
            data:userData,
            userName
        })
    }
    res.render("index",{
        cookies:req.cookies.user,
        data:userData
    })
})

module.exports = routes