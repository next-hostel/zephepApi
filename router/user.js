const express = require('express');
const router = express.Router();
const {contactValidator} = require('../validators/auth');
const { runValidation } = require('../validators');



// import controller
const { requireSignin, authMiddleware, adminMiddleware } = require('../controllers/auth');

 const { read, update,  updatePassword } = require('../controllers/user');



 router.get('/user/:id', requireSignin, read);
 router.put('/user/update', requireSignin, update);
 router.put('/password', requireSignin, updatePassword);
//  router.put('/admin/update', requireSignin, adminMiddleware, update);


 
module.exports = router;