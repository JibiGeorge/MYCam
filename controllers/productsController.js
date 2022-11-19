const userProductModel = require('../model/userProductModel')
const categoryController = require('../model/category')
const userCartModel = require('../model/userCart')
const productModel = require('../model/product')
const userWishlistController = require('../model/wishlistModel')
const brnadModel = require('../model/brand')
const { ObjectID } = require('bson')


const getFeaturedProducts = async(req,res)=>{
    let id = req.query.id;
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    let brands = await brnadModel.getAllBrand()
    productModel.getFeaturedProducts().then((products)=>{
        categoryController.getCategory().then((category) => {
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,products,category, wishlistCount,brands,id})
        })
    })
}

const getRecenetProducts = async(req,res)=>{
    let id = req.query.id;
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    let brands = await brnadModel.getAllBrand()
    productModel.getRecentProducts().then((products)=>{
        categoryController.getCategory().then((category) => {
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,products,category,wishlistCount,brands,id})
        })
    })
}

const showProductPage = async(req,res)=>{
    let id = req.query.id;
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    let brands = await brnadModel.getAllBrand()
    categoryController.getCategory().then((category) => {
        res.render('user/productsList',{admin:false,user:true,userData,cartCount,wishlistCount,category,id,brands})
    })
}

const showAllProducts = async(req,res)=>{
    let id = req.query.id;
    let limit = req.query.limit
    productModel.getProductList(id,limit).then((products)=>{
        res.send(products)
    })
}

const filteredProducts = async (req,res)=>{
    const id = req.body.brandID;
    const limit = req.body.limit;
    if(id == ""){
        productModel.getProductList(id,limit).then((products)=>{
            res.send(products)
        })
    }else{
        productModel.getFilterProducts(id,limit).then((products)=>{
            res.send({products,id})
        })
    }

}



module.exports = {
    getFeaturedProducts,
    getRecenetProducts,
    showProductPage,
    showAllProducts,
    filteredProducts
}