const express = require('express')
const router = express.Router()
const methodoverride = require('method-override')
const userHomePageController = require('../controllers/userHomePageController')
const userLoginController = require('../controllers/userLoginController')
const userCartController = require('../controllers/userCartController')
const addressController = require('../controllers/addressController')
const orderController = require('../controllers/orderController')
const productsController = require('../controllers/productsController')
const userProfileController = require('../controllers/userProfileController')

router.use(methodoverride('_method'))

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

router.get('/category/showProducts',productsController.showProducts)
router.get('/featured/viewMore',productsController.getFeaturedProducts)
router.get('/recent/viewMore',productsController.getRecenetProducts)
router.get('/shop',productsController.showAllProducts)

router.get('/userProfile',userProfileController.showProfilePage)
router.get('/userProfile/address',userProfileController.showAddress)
router.put('/userProfile/profile/update',userProfileController.updateProfile)
router.put('/userProfile/email/update',userProfileController.updateEmailPhone)
router.get('/userProfile/addressEditPage',userProfileController.addressEditPage)
router.put('/userProfile/address/update',userProfileController.updateAddress)
router.delete('/userProfile/addressDelete',userProfileController.addressDelete)
router.put('/userProfile/password/update',userProfileController.updatePassword)

router.post('/verifyPayment',(req,res)=>{
    console.log(req.body);
})






module.exports = router