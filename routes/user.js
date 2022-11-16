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
const sessionHandle = require('../middleware/userSession')
const userWishlistController = require('../controllers/wishlistController')

router.use(methodoverride('_method'))

router.get('/', userHomePageController.homePage)

router.get('/login',sessionHandle.userLoginSession, userLoginController.loginPage)
router.get('/signup',sessionHandle.userSignupSession, userLoginController.signUpPage)
router.post('/userSignUp', userLoginController.doSignUp)
router.post('/signup/verification',userLoginController.doSignUpVerification)
router.post('/userLogin', userLoginController.doLogin)
router.get('/logout', userLoginController.doLogout)

router.get('/product/showDetail', userHomePageController.showDetail)
router.post('/product/showDetail/add-tocart',userCartController.addtoCart)

router.get('/wishlist',sessionHandle.userLoginSession,userWishlistController.wishlistPage)
router.post('/product/add-toWishlist',sessionHandle.userLoginSession,userWishlistController.addtoWishlist)
router.delete('/wishlist/proDelete',sessionHandle.userLoginSession,userWishlistController.deleteProduct)

router.get('/cart',sessionHandle.userLoginSession, userCartController.showCart)
router.post('/cart/chageProductQuanity', userCartController.changeQuantity)
router.post('/cart/applyCoupon',userCartController.applyCoupon)

router.post('/addAddress', addressController.addAddress)
router.post('/cart/proceedToPayment',sessionHandle.userLoginSession, userCartController.proceedToPayment)
router.get('/addressPage',sessionHandle.userLoginSession, addressController.getAddressPage)

router.post('/placeOrder',orderController.placeOrder)
router.post('/verifyPayment',orderController.verifyPayment)
router.get('/user/placeOrder',orderController.placeOrderPage)
router.get('/order-success',sessionHandle.userLoginSession, orderController.orderSuccess)
router.get('/orders',sessionHandle.userLoginSession, orderController.ordersPage)

router.post('/orders/viewOrderDetails',orderController.getOrderProductDetails)
router.get('/user/verificationfailed',sessionHandle.userLoginSession, userLoginController.loginFailed)
router.post('/orders/cancel',orderController.cancelOrder)

router.get('/featured/viewMore',productsController.getFeaturedProducts)
router.get('/recent/viewMore',productsController.getRecenetProducts)
router.get('/shop',productsController.showProductPage)
router.get('/shop/products',productsController.showAllProducts)

router.get('/userProfile',sessionHandle.userLoginSession, userProfileController.showProfilePage)
router.get('/userProfile/address',sessionHandle.userLoginSession, userProfileController.showAddress)
router.put('/userProfile/profile/update',userProfileController.updateProfile)
router.put('/userProfile/email/update',userProfileController.updateEmailPhone)
router.get('/userProfile/addressEditPage',sessionHandle.userLoginSession, userProfileController.addressEditPage)
router.put('/userProfile/address/update',userProfileController.updateAddress)
router.delete('/userProfile/addressDelete',sessionHandle.userLoginSession, userProfileController.addressDelete)
router.put('/userProfile/password/update',userProfileController.updatePassword)








module.exports = router