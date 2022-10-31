const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')
const productModel = require('/Brototype/Week 8/MyCam/model/product')
const userProductModel = require('/Brototype/Week 8/MyCam/model/userProductModel')
const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')

const homePage = async (req, res) => {
    let userData = req.session.user
    let cartCount=null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    console.log("count",cartCount);
    imageSlider.showImages().then((SliderImage) => {
        categoryController.getCategory().then((category) => {
            productModel.getFeaturedProducts().then((featuredProducts) => {
                productModel.getRecentProducts().then((recentProducts) => {
                    res.render('user/homePage', { admin: false, user: true, category, userData, SliderImage, featuredProducts, recentProducts,cartCount})
                })
            })
        })
    })
}

const showDetail = async (req, res) => {
    let cartCount=null;
    let userData = req.session.user
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    userProductModel.showProductDetails(req.query.id).then((productData) => {
        categoryController.getCategory().then((category) => {
            res.render('user/productDetails', { admin: false, user: true, productData, category,userData,cartCount})
        })
    })
}

module.exports = {
    homePage,
    showDetail
}