const userCartModel = require('../model/userCart')
const categoryController = require('../model/category')

const addtoCart = (req, res) => {
    userCartModel.addToCart(req.body.productID, req.body.price, req.session.user._id).then(() => {
        res.json({ status: true })
    })
}

const showCart = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(userData._id)
    }
    userCartModel.getTotalAmount(userData._id).then((response) => {
        let totalAmount = response.totalAmount
        userCartModel.getCartParoducts(req.session.user._id).then((products) => {
            categoryController.getCategory().then((category) => {
                res.render('user/cart', { admin: false, user: true, category, userData, products, cartCount, totalAmount })
            })
        })
    })

}

const changeQuantity = (req, res, next) => {
    let userData = req.session.user
    userCartModel.changeProductQuantity(req.body).then(async (response) => {
        userCartModel.getTotalAmount(userData._id).then((result) => {
            let totalAmount = result.totalAmount
            res.json({ response, totalAmount })
        })
    })
}

const proceedToPayment = async (req, res) => {
    let discountAmount = req.body.discountAmount;
    let couponCode = req.body.couponCode.toUpperCase()
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    totalAmount = totalAmount.totalAmount
    let final_Amount = totalAmount - discountAmount
    res.send({ discountAmount, couponCode })
}

const applyCoupon = async (req, res) => {
    let userData = req.session.user
    let couponCode = req.body.code
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    totalAmount = totalAmount.totalAmount
    userCartModel.applyCoupon(couponCode, totalAmount).then((response) => {
        res.send(response)
    })
}

module.exports = {
    addtoCart,
    showCart,
    changeQuantity,
    proceedToPayment,
    applyCoupon
}