const userProductModel = require('../model/userProductModel')
const categoryController = require('../model/category')
const userCartModel = require('../model/userCart')
const productModel = require('../model/product')
const userWishlistController = require('../model/wishlistModel')

const showProducts = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    let categoryID = req.query.id
    userProductModel.getProducts(categoryID).then((products) => {
        categoryController.getCategory().then((category) => {
            res.render('user/productsList', { admin: false, user: true, category, userData, cartCount,products, wishlistCount})
        })
    })
}

const getFeaturedProducts = async(req,res)=>{
    console.log("Got it");
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    productModel.getFeaturedProducts().then((products)=>{
        categoryController.getCategory().then((category) => {
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,products,category, wishlistCount})
        })
    })
}

const getRecenetProducts = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    productModel.getRecentProducts().then((products)=>{
        categoryController.getCategory().then((category) => {
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,products,category,wishlistCount})
        })
    })
}

const showAllProducts = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        productModel.getProducts().then((products)=>{
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,category,products,wishlistCount})
    })
    })
}

module.exports = {
    showProducts,
    getFeaturedProducts,
    getRecenetProducts,
    showAllProducts
}