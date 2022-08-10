const express=require('express');
const router=express.Router();
const{register,loginUser}=require('../controller/user')

const{isAuthenticated}=require('../middlewares/auth')
router.route('/register').post(register)
router.route('/login').post(loginUser)
module.exports=router;







