const User=require('../models/User')
const jwt=require('jsonwebtoken')

exports.ifAdmin=async(req,res,next)=>{
    try {
        const {token} =req.cookies;
        if(!token){
            return res.status(401).json({success:false,message:"Please login first"})
        }
        console.log(token)
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        // const decoded=await jwt.sign({_id:this._id},process.env.JWT_SECRET)
        console.log(decoded)
        req.user=await User.findById(decoded._id)
        if(req.user.role=="admin"){
            next();}

        return res.status(404).json({success:false,message:"Login Failed.Not admin"})
        }

        catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}