const express=require('express');
const{register,loginUser,logout,updateRole,getUser}=require('../controller/user.Controller')

const{isAuthenticated,isAdmin}=require('../middlewares/auth')
const router=express.Router();
router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route('/update').put(updateRole)
router.route("/getUser").get(isAuthenticated,isAdmin,getUser)
module.exports=router;







