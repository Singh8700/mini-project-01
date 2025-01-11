const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const routes = express.Router()

routes.get("/",async(req,res)=>{
    if(req.cookies.user){
        const data = await jwt.verify(req.cookies.user,process.env.JWT_SECRET)
        const userData =  await userModel.findOne({
            _id:data.userId
        })
        // console.log(data)
        return res.render("index",{
            cookies:req.cookies.user,
            data:userData
        })
    }
    res.render("index",{
        cookies:req.cookies.user
    })
})

module.exports = routes