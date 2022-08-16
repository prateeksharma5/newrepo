const Admin=require('../models/Admin')
exports.registerAdmin=async(req,res)=>{
    try{
        console.log(req.body)
        const{username,email,password}=req.body;
        let admin=await Admin.findOne({email});
        if(admin){
         return res
         .status(400)
         .json({success:false,message:'Admin already exists'})
        }
        admin=await Admin.create({
            username,
            email,
            password,
            
    })
    res.status(201).json({success:true,admin})
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//_____________________________________________________
exports.loginAdmin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const admin= await Admin.findOne({email}).select("+password")
        if(!admin){
            return res.status(400).json({Success:false,message:"admin not found"})
        }
        const isMatch=await admin.matchPassword(password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const options={expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true}
        const token= await admin.generateToken();
        res.status(201).cookie("token",token,options).json({
            success:true,
            message:"Admin logged in successfully",
            admin,token
        })


    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
exports.logoutAdmin=async(req,res)=>{
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