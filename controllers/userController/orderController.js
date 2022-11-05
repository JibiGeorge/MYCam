const orderModel = require('/Brototype/Week 8/MyCam/model/orderModel')
const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const placeOrder = async (req, res) => {
    console.log(req.body);
    let totalPrice = await userCartModel.getTotalAmount(req.body.userID)
    orderModel.placeOrder(req.body, totalPrice,req.body.userID).then((orderID) => {
        if (req.body.paymentMethod == 'COD') {

            res.json({ codSuccess: true })
        } else {
            orderModel.generateRazorPay(orderID, totalPrice).then((response) => {
                res.json(response)
            })
        }
    })

}
const orderSuccess = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        res.render('user/orderSuccess', { admin: false, user: true, category, userData, cartCount })
    })
}

const ordersPage = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        orderModel.getOrderList(userData._id).then((productList)=>{
            res.render('user/userOrder', { admin: false, user: true, category, userData, cartCount, productList })
        })
    })
}

const getOrderProductDetails = (req,res)=>{
    let orderID = req.body.orderID
    // console.log(orderID);
    orderModel.getOrderedProductDetails(orderID).then((orderProductDetails)=>{
        // console.log(orderProductDetails);
        res.json({orderProductDetails})
    })
}

module.exports = {
    placeOrder,
    orderSuccess,
    ordersPage,
    getOrderProductDetails
}