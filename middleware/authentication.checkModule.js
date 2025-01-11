const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authenticationCheck = async(req,res,next)=>{
    // const token = jwt.verify(req.cookies,process.env.JWT_SECRET)
    // console.log("user token is ",req.cookies)
    if(req.cookies.user){
     const data = await jwt.verify(req.cookies.user,process.env.JWT_SECRET)
    //  console.log("user data is",data.userId)
     req.user = await userModel.findOne({_id:data.userId})
     req.userPassword = data.password
     return next()
    }
    res.render("login")
}


module.exports = authenticationCheck