const express = require("express")
const userModel = require("../models/user.model")
const routes = express.Router()
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")
const auth = require("../middleware/authentication.checkModule")

routes.get("/register",(req,res)=>{
    res.render("register")
})

routes.post("/register-data",async(req,res)=>{

    const {userName,fullName,email,password} = req.body
    const exsitUser = await userModel.findOne({email})
    if(exsitUser){
        return res.status(300).json({
            msg:"This email is already exsits"
        })
    }
    const existingUser = await  userModel.findOne({userName})
    if(existingUser){
       return res.status(300).json({
            msg:"This userName is already exists"
        })
    }
    const hashPasword = await bcrypt.hash(password,10)
   const user = await userModel.create({
        userName,
        fullName,
        email,
        password:hashPasword
    })
    const jwtPassword = jwt.sign({password:password, userId:user._id,email:email},process.env.JWT_SECRET)
    res.cookie("user",jwtPassword)
    // res.json(req.body)
    console.log("Registeration Done")
    console.log(req.cookies.user)
    res.redirect("/")
})



module.exports = routes