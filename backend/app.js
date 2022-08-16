const express=require('express')
const app= express();
const cookieParser=require('cookie-parser')
require('dotenv').config({path:'backend/config/config.env'})
const bodyParser=require("body-parser")





//using middlewares
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())


//importing routes
const router=express.Router();
const user=require('./routes/user')
const Admin=require('./routes/Admin')

//using routes
app.use('/api/v2',user)
app.use('/api/v2',Admin)



module.exports=app;