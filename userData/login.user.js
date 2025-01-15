const express = require("express")
const routes = express.Router()
const bcrypt = require("bcryptjs")
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
    console.log(password)
    const oldPassword = userData.password
    console.log(oldPassword)
    const result = await bcrypt.compareSync(password,oldPassword)
    if(result){
            console.log("password", result)
            const jwtPassword = await jwt.sign({password:password, userId:userData._id,email:email},process.env.JWT_SECRET)

        await  res.cookie("user",jwtPassword)

        res.redirect("/")
        }else{
            console.log("password", result)
            res.status(400).json({
                msg:"Soemthing want wrongs"
            })
        }
 

    
})

module.exports = routes