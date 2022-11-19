const userCartModel = require('../model/userCart')
const userWishlistController = require('../model/wishlistModel')
const categoryController = require('../model/category')

const getPage = async(req,res)=>{
    let userData = req.session.user
    let cartCount=null;
    let wishlistCount=null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
    res.render('user/contact_Us',{user:true,admin:false,userData,cartCount,wishlistCount,category})
    })
}

module.exports = {
    getPage
}