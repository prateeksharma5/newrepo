const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const AdminSchema=new mongoose.Schema({
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
}
})
AdminSchema.pre('save',async function(next){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
}
next();
})
AdminSchema.methods.matchPassword =async function(password){
    return await bcrypt.compare(password,this.password)
}
AdminSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)

}
module.exports=mongoose.model('Admin',AdminSchema)