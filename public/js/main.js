console.log("main file")

const show=()=>{
    const showPassword = document.getElementById("password")
    const hidePassword = document.getElementById("hide")
    // alert("btn hit")
    // console.log("pass",x)
    if(showPassword.type === "password"){
        showPassword.type = "text"
        hidePassword.innerText = "Hide Password"
    }else{
        showPassword.type = "password"
        hidePassword.innerText = "Show Password"
    }
   
}

const confirm=()=>{
    const showPassword = document.getElementById("confirm-password")
    const hidePassword = document.getElementById("confirm-hide")
    // alert("btn hit")
    // console.log("pass",x)
    if(showPassword.type === "password"){
        showPassword.type = "text"
        hidePassword.innerText = "Hide Password"
    }else{
        showPassword.type = "password"
        hidePassword.innerText = "Show Password"
    }
}

// passowrd check
const passwordCheck = () =>{
    const firstPassword = document.getElementById("password")
    const secondPassword = document.getElementById("confirm-password")

    if(firstPassword.value == secondPassword.value){
        return
    }else{
        event.preventDefault()
        alert("Please write same password")
    }
}

// post check is not empty
const check=()=>{
    const data = document.getAnimations("post")
    if(post.value === ""){
         alert("Something want wrong please try again later")
       return event.preventDefault()
    }
}
// add new post
const addPost=()=>{
    // alert("work")
    const close = document.getElementById("close")
// console.log(close.classList)
    close.classList.remove("hidden")
}

const closePost=()=>{
    const close = document.getElementById("close")
    // console.log(close.classList)
        close.classList.add("hidden")
}