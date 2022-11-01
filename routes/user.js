const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')
const userCartController = require('../controllers/userController/userCartController')
const addressController = require('../controllers/userController/addressController')

router.get('/', userHomePageController.homePage)

router.get('/login', userLoginController.loginPage)
router.get('/signup', userLoginController.signUpPage)
router.post('/userSignUp', userLoginController.doSignUp)
router.post('/userLogin', userLoginController.doLogin)
router.get('/logout', userLoginController.doLogout)

router.get('/product/showDetail', userHomePageController.showDetail)
router.get('/product/showDetail/add-tocart/:id', userCartController.addtoCart)

router.get('/cart', userCartController.showCart)
router.post('/cart/chageProductQuanity', userCartController.changeQuantity)

router.post('/addAddress',addressController.addAddress)
router.get('/cart/proceedToPayment',userCartController.proceedToPayment)
router.get('/addressPage',addressController.getAddressPage)




//Dummy test
const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')

router.get('/address', async (req, res) => {
    
})



module.exports = router