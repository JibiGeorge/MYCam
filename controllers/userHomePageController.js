const categoryController = require('../model/category')
const imageSlider = require('../model/sliderImageModel')
const productModel = require('../model/product')
const userProductModel = require('../model/userProductModel')
const userCartModel = require('../model/userCart')
const userWishlistController = require('../model/wishlistModel')

const homePage = async (req, res) => {
    let userData = req.session.user
    let cartCount=null;
    let wishlistCount=null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    imageSlider.showImages().then((SliderImage) => {
        categoryController.getCategory().then((category) => {
            productModel.getFeaturedProducts().then((featuredProducts) => {
                productModel.getRecentProducts().then((recentProducts) => {
                    res.render('user/homePage', { admin: false, user: true, category, userData, SliderImage, featuredProducts, recentProducts,cartCount,wishlistCount})
                })
            })
        })
    })
}

const showDetail = async (req, res) => {
    let cartCount=null;
    let wishlistCount=null;
    let userData = req.session.user
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    userProductModel.showProductDetails(req.query.id).then((productData) => {
        categoryController.getCategory().then((category) => {
            res.render('user/productDetails', { admin: false, user: true, productData, category,userData,cartCount, wishlistCount})
        })
    })
}

module.exports = {
    homePage,
    showDetail
}