const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
username:{
    type:String,required:[true,'Please Enter your name']
},
email:{
    type:String,
    required:[true,"Please Enter Email"],
    unique:[true,"Email already exists"]

},
password:{
    type:String,
required:[true,"Please Enter Password"],
select:false,
},
firstname:{type:String,
required:[true,"Mandatory to Enter First Name"],
},
lastname:{
    type:String,
    required:[true,"Mandatory to Enter last name"]
},
phone:{
    type:Number,
    required:[true,"Please Enter phone number"]
}
})
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
}
next();
})

userSchema.methods.matchPassword =async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)

}
module.exports=mongoose.model('User',userSchema)