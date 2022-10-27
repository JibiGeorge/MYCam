const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')

router.get('/',userHomePageController.homePage)
router.get('/login',userLoginController.login)
router.get('/signup',userLoginController.signUp)
router.post('/userSignUp',userLoginController.doSignUp)


module.exports = router