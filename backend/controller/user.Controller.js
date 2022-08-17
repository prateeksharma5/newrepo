const User=require('../models/user.Model')
const jwt = require("../middlewares/jwt")
exports.register=async(req,res)=>{
    try{
        console.log(req.body)
        const{username,email,password,firstname,lastname,phone,role}=req.body;
        let user=await User.findOne({email});
        if(user){
         return res.status(400).json({success:false,message:'user already exists'})
        }
        user=await User.create({username,email,password,firstname,lastname,phone,role})
    res.status(201).json({success:true,user})
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
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
        const token= await jwt.sign(user);

        res.status(201).json({
            success:true,
            message:"User logged in successfully",
            user,token
        })
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
exports.logout=async(req,res)=>{
    try{
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Log Out"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getUser = async(req,res)=>{
    try { 
         const user = await User.findById(req.token.id)
         if(!user){
            res.status(403).send();
            return;
         }
         return res.json(
            {
                data:user.email
            }
         )

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        }) 
    }
}

exports.updateRole=async(req,res)=>{
    try{
        user=await User.findOneAndUpdate({'email':req.body.email},{role:req.body.role})
        res.json({success:true,user})
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
