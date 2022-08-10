//const { json } = require('express');
const User=require('../models/User')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
exports.register=async(req,res)=>{
    try{
        console.log(req.body)
        const{name,email,password,fname,lname,mobileno}=req.body;
        let user=await User.findOne({email});
        if(user){
         return res
         .status(400)
         .json({success:false,message:'user already exists'})
        }
        user=await User.create({
            name,
            email,
            password,
            fname,
            lname,
            mobileno,
            
    })
    res.status(200).json({success:true,user})
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}