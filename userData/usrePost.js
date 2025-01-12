const express = require("express")
const authenticationCheck = require("../middleware/authentication.checkModule")
const userModel = require("../models/user.model")
const userPost = require("../postData/post.usermodel")
const routes = express.Router()

routes.post("/post",authenticationCheck,async(req,res)=>{
    const userData = await userModel.findOne({userName:req.user.userName})
    const {title,post} = req.body
    // console.log(userData._id)
    const createPost = await userPost.create({
        user: userData._id,
        title,
        post
    })
    await userData.posts.push(createPost._id)
   await userData.save()
//    req.postDetails = createPost
   res.redirect("/user/post")
})


module.exports = routes