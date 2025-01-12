const express = require("express")
const userPost = require("./post.usermodel")
const route =express.Router()
const authenticationCheck = require("../middleware/authentication.checkModule")

route.get("/like/:id",authenticationCheck,async(req,res)=>{
    const post = await userPost.findOne({
        _id:req.params.id
    }).populate("user")
    // console.log(req.user._id)
    // console.log(post.likes)
    if(post.likes.indexOf(req.user._id) === -1){
        await post.likes.push(req.user._id)
    }else{
        const userRemove = post.likes.indexOf(req.user._id)
        await post.likes.splice(userRemove, 1)
    }
    await post.save()
    res.redirect("/user/post")
})



module.exports = route