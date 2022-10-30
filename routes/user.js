const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')

router.get('/',userHomePageController.homePage)

router.get('/login',userLoginController.loginPage)
router.get('/signup',userLoginController.signUpPage)
router.post('/userSignUp',userLoginController.doSignUp)
router.post('/userLogin',userLoginController.doLogin)
router.get('/logout',userLoginController.doLogout)




router.get('/test',(req,res)=>{
    let userData = req.session.user
    categoryController.getCategory().then((category)=>{
        res.render('user/productDetails',{admin:false,user:true,title:"Test",category,userData})
    })
})


module.exports = router