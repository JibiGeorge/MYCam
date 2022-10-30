const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')
const productModel = require('/Brototype/Week 8/MyCam/model/product')
const userProductModel = require('/Brototype/Week 8/MyCam/model/userProductModel')

const homePage = (req, res) => {
    let userData = req.session.user
    imageSlider.showImages().then((SliderImage) => {
        categoryController.getCategory().then((category) => {
            productModel.getFeaturedProducts().then((featuredProducts) => {
                productModel.getRecentProducts().then((recentProducts) => {
                    res.render('user/homePage', { admin: false, user: true, category, userData, SliderImage, featuredProducts, recentProducts })
                })
            })
        })
    })
}

const showDetail = (req, res) => {
    let userData = req.session.user
    userProductModel.showProductDetails(req.query.id).then((productData) => {
        categoryController.getCategory().then((category) => {
            res.render('user/productDetails', { admin: false, user: true, productData, category,userData    })
        })
    })
}

module.exports = {
    homePage,
    showDetail
}