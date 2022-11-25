const orderModel = require('../model/orderModel')
const userCartModel = require('../model/userCart')
const categoryController = require('../model/category')
const userAddressModel = require('../model/userAddressModel')
const userWishlistController = require('../model/wishlistModel')



const orderPage = (req, res) => {
    orderModel.getAllOrders().then((response) => {
        res.render('admin/productOrder', { admin: true, title: "Orders", user: false, response })
    })
}

const orderDetails = (req, res) => {
    let orderID = req.query.id
    orderModel.getOrderDetails(orderID).then((orderDetails) => {
        let orders = orderDetails[0] ? orderDetails[0] : "";
        res.render('admin/orderDetailsPage', { admin: true, user: false, title: "Order Details", orders })
    })
}

const updateOrderDetails = (req, res) => {
    orderModel.updateOrderDetails(req.body).then((response) => {
        res.send(response)
    })
}
const placeOrder = async (req, res) => {
    let totalPrice = await userCartModel.getTotalAmount(req.body.userID);
    totalPrice = totalPrice.totalAmount;
    let finalPrice = totalPrice - req.body.discountAmount;
    let coupon = req.body.coupon;
    let discountAmount = req.body.discountAmount;
    orderModel.placeOrder(req.body, totalPrice, req.body.userID, finalPrice, coupon, discountAmount).then((orderID) => {
        if (req.body.paymentMethod == 'COD') {
            res.json({ codSuccess: true })
        } else {
            orderModel.generateRazorPay(orderID, finalPrice).then((response) => {
                res.json(response)
            })
        }
    })

}
const orderSuccess = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        res.render('user/orderSuccess', { admin: false, user: true, category, userData, cartCount,wishlistCount })
    })
}

const ordersPage = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        orderModel.getOrderList(userData._id).then((productList) => {
            res.render('user/userOrder', { admin: false, user: true, category, userData, cartCount, productList,wishlistCount })
        })
    })
}

const getOrderProductDetails = (req, res) => {
    let orderID = req.body.orderID
    orderModel.getOrderedProductDetails(orderID).then((orderProductDetails) => {
        res.json({ orderProductDetails })
    })
}

const cancelOrder = (req, res) => {
    let orderID = req.body.orderID;
    orderModel.cancelOrder(orderID).then((response) => {
        res.send(response)
    })

}

const placeOrderPage = async (req, res) => {
    let discountAmount = req.query.discountAmount;
    let couponCode = req.query.couponCode;
    let userData = req.session.user
    let cartCount = null;
    let wishlistCount = null;
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    totalAmount = totalAmount.totalAmount
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
        wishlistCount = await userWishlistController.getWishListCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        userAddressModel.getAddressList(req.session.user._id).then((addressList) => {
            userCartModel.getCartParoducts(req.session.user._id).then((products) => {
                console.log(addressList);
                res.render('user/placeorder', { admin: false, user: true, category, userData, cartCount, addressList, products, totalAmount, discountAmount, couponCode, wishlistCount })
            })
        })
    })
}

const verifyPayment = (req,res)=>{
    orderModel.verifyPayment(req.body).then(()=>{
        orderModel.changePaymentStatus(req.body.order.receipt).then(()=>{
            console.log("Payment SuccessFull");
            res.json({status:true})
        })
    }).catch((err)=>{
        console.log(err);
        res.json({status:false,errMsg: ""})
    })
}

const orderStatusCount = (req,res)=>{
    orderModel.getOrderStatusCount().then((response)=>{
        let pending;
        let placed;
        let delivered;
        let cancelled;
        for (values of response){
            if(values._id.status == 'Placed'){
                placed = values.count
            }else if(values._id.status == 'Pending'){
                pending = values.count
            }else if(values._id.status == 'Delivered'){
                delivered = values.count
            }else if(values._id.status == 'Cancelled'){
                cancelled = values.count
            }
        }
        res.send({pending,placed,delivered,cancelled})
    })
}

module.exports = {
    orderPage,
    orderDetails,
    updateOrderDetails,
    placeOrder,
    orderSuccess,
    ordersPage,
    getOrderProductDetails,
    cancelOrder,
    placeOrderPage,
    verifyPayment,
    orderStatusCount
}