const cookieParser = require("cookie-parser")
const express = require("express")
const path = require("path")
const db = require("./config/db.config")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const authenticationCheck = require("./middleware/authentication.checkModule")

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

db()


// create first routes
app.get("/",(req,res)=>{
    res.render("index",{
        cookies:req.cookies.user
    })
})

// custom routers
const RegisterData = require("./userData/register.user")
const LoginData = require("./userData/login.user")
const logOut = require("./userData/logout.user")
const ProfileData = require("./userData/profile.user")
const userPost = require("./userData/usrePost")
app.use("/user",RegisterData)
app.use("/user",LoginData)
app.use("/user",logOut)
app.get("/user/post",authenticationCheck,ProfileData)
app.use("/user",userPost)
// app routes init by express server
app.listen(9000,()=>{
    console.log("servre is running")
})