const express=require('express');
const{register,loginUser,logout}=require('../controller/user')

const{isAuthenticated}=require('../middlewares/auth')
const router=express.Router();
router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route("/logout").get(logout)
module.exports=router;







