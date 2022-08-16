const express=require('express');
const{registerAdmin,loginAdmin, logoutAdmin}=require('../controller/Admin')

const{isAuthenticated}=require('../middlewares/auth')
const router=express.Router();
router.route('/registeradmin').post(registerAdmin)
router.route('/loginadmin').post(loginAdmin)
router.route('/logoutAdmin').get(logoutAdmin)
module.exports=router;