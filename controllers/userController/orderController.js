const orderModel = require('/Brototype/Week 8/MyCam/model/orderModel')
const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const placeOrder = async(req,res)=>{
    // if(req.body.paymentMethod == 'COD')
    let products = await userCartModel.getCartProductList(req.body.userID)
    let totalPrice = await userCartModel.getTotalAmount(req.body.userID)
    orderModel.placeOrder(req.body,products,totalPrice).then((response)=>{
        res.json({status:true})
    })

}
const orderSuccess = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        res.render('user/orderSuccess', { admin: false, user: true, category, userData, cartCount })
    })
}

module.exports = {
    placeOrder,
    orderSuccess
}