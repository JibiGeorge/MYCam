const wishlistModel = require('../model/wishlistModel')
const userCartModel = require('../model/userCart')
const categoryController = require('../model/category')

const addtoWishlist = (req, res) => {
    wishlistModel.addtoWishlist(req.body.productID, req.session.user._id).then(() => {
        res.json({ status: true })
    })
}

const wishlistPage = async(req,res)=>{
    let userData = req.session.user
    let cartCount=null;
    let wishlistCount=null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await wishlistModel.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        wishlistModel.getAllWishList(req.session.user._id).then((wishList)=>{
            res.render('user/wishlist',{admin:false,user:true,userData,cartCount,wishlistCount,category,wishList})
        })
    })
}

const deleteProduct = (req,res)=>{
    wishlistModel.deleteProduct(req.session.user._id,req.body.id).then((response)=>{
        res.json(response)
    })
}

module.exports = {
    addtoWishlist,
    wishlistPage,
    deleteProduct
}