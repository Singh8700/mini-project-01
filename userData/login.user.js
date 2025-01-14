const express = require("express")
const routes = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
routes.get("/login",(req,res)=>{
    res.render("login")
})

routes.post("/login-data",async(req,res,next)=>{
    const {email,password} = req.body
    // res.json({
    //     email,
    //     password
    // })
    // check user register yet or not
    const userData = await userModel.findOne({email})
    if(!userData){
         res.status(400).json({
            msg:"Something Want Wrong"
        })
        return next()
    }

    await bcrypt.compare(password,userData.password,async (error,result)=>{
        if(error){
           return res.status(400).json({
                msg:"Something want Worng"
            })
            // console.log(result)
            // return next()
        }
        const jwtPassword = await jwt.sign({password:password, userId:userData._id,email:email},process.env.JWT_SECRET)

        await  res.cookie("user",jwtPassword)

        res.redirect("/")
    })

    
})

module.exports = routes