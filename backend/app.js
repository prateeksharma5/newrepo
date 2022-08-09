const express=require('express')
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//const bodyparser=require("body-parser")
const user= require("./routes/user")
app.use('/api/v2',user)
module.exports=app