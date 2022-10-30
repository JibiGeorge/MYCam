const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')
const userProductController = require('../controllers/userController/userProductController')

router.get('/',userHomePageController.homePage)

router.get('/login',userLoginController.loginPage)
router.get('/signup',userLoginController.signUpPage)
router.post('/userSignUp',userLoginController.doSignUp)
router.post('/userLogin',userLoginController.doLogin)
router.get('/logout',userLoginController.doLogout)

router.get('/product/showDetail',userHomePageController.showDetail)
router.get('/product/showDetail/add-tocart/:id',userProductController.addtoCart)




module.exports = router