
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const profileDta = async(req,res,next)=>{
    // console.log("profile data is",req.user.email)
    const data = await userModel.findOne({email:req.user.email})
    await data.populate("posts")
    // populate yani one by one show karna
    console.log("post data is : ",await data.post)
    const dataPass = req.userPassword
    res.render("profile",{
        data,
        dataPass
    })
    next()
}


module.exports = profileDta