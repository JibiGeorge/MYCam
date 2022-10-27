const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')

router.get('/',userHomePageController.homePage)

router.get('/login',userLoginController.loginPage)
router.get('/signup',userLoginController.signUpPage)
router.post('/userSignUp',userLoginController.doSignUp)
router.post('/userLogin',userLoginController.doLogin)


module.exports = router