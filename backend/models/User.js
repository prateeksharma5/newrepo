const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a name']
    },
    email:{
        type:String,
        required:[true,'please enter a mail'],
        unique:[true,'email already exists']
    },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'password must be atleast 6 characters']
    },
    fname:{
        type:String,
        required:[true,'please enter your fname']
    },
    lname:{
        type:String,
        required:[true,'please enter your last name']
    },
    mobileno:{
        type:Number,
        required:[true,'please enter your valid mobile number']
    },
})
module.exports=mongoose.model('User',UserSchema);