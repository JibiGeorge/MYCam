const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')
const userLoginController = require('../controllers/userController/userLoginController')
const userCartController = require('../controllers/userController/userCartController')
const addressController = require('../controllers/userController/addressController')
const orderController = require('../controllers/userController/orderController')

router.get('/', userHomePageController.homePage)

router.get('/login', userLoginController.loginPage)
router.get('/signup', userLoginController.signUpPage)
router.post('/userSignUp', userLoginController.doSignUp)
router.post('/signup/verification',userLoginController.doSignUpVerification)
router.post('/userLogin', userLoginController.doLogin)
router.get('/logout', userLoginController.doLogout)

router.get('/product/showDetail', userHomePageController.showDetail)
router.post('/product/showDetail/add-tocart', userCartController.addtoCart)

router.get('/cart', userCartController.showCart)
router.post('/cart/chageProductQuanity', userCartController.changeQuantity)

router.post('/addAddress',addressController.addAddress)
router.get('/cart/proceedToPayment',userCartController.proceedToPayment)
router.get('/addressPage',addressController.getAddressPage)


router.post('/placeOrder',orderController.placeOrder)
router.get('/order-success',orderController.orderSuccess)
router.get('/orders',orderController.ordersPage)

router.post('/orders/viewOrderDetails',orderController.getOrderProductDetails)
router.get('/user/verificationfailed',userLoginController.loginFailed)
router.post('/orders/cancel',orderController.cancelOrder)


router.post('/verifyPayment',(req,res)=>{
    console.log(req.body);
})






module.exports = router