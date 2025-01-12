const express = require('express')
const route = express.Router()
const authenticationCheck = require("../middleware/authentication.checkModule")
const userPost = require('./post.usermodel')

route.get("/edit/:id",authenticationCheck,async(req,res)=>{
    // get post data
    const userPostData = await userPost.findOne({
        _id:req.params.id
    })
    // console.log("edit post",userPostData)
    res.render("edit",{
        data:userPostData
    })
})

route.post("/editPost/:id",async(req,res)=>{
    // console.log(req.params.id)
    const {title,post} = await req.body
    // console.log("title is ",title,"post is ",post)
    const userData = await userPost.findOneAndUpdate(
        {
            _id:req.params.id
        },
        {
            title,
            post
        })
   
    // console.log(userData)
    res.redirect("/user/post")
})



module.exports = route