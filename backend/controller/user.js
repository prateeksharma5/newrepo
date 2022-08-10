const User=require('../models/User')
exports.register=async(req,res)=>{
    try{
        console.log(req.body)
        const{username,email,password,firstname,lastname,phone}=req.body;
        let user=await User.findOne({email});
        if(user){
         return res
         .status(400)
         .json({success:false,message:'user already exists'})
        }
        user=await User.create({
            username,
            email,
            password,
            firstname,
            lastname,
            phone,
            
    })
    res.status(201).json({success:true,user})
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//____________________________________---
//User login code
exports.loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user= await User.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({Success:false,message:"user not found"})
        }
        const isMatch=await user.matchPassword(password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const options={expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true}
        const token= await user.generateToken();
        res.status(201).cookie("token",token,options).json({
            success:true,
            message:"User logged in successfully",
            user,token
        })


    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}