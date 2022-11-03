const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userAddressModel = require('/Brototype/Week 8/MyCam/model/userAddressModel')

const addtoCart = (req, res) => {
    userCartModel.addToCart(req.params.id, req.session.user._id).then(() => {
        res.json({ status: true })
    })
}

const showCart = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(userData._id)
    }
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    userCartModel.getCartParoducts(req.session.user._id).then((products) => {
        categoryController.getCategory().then((category) => {
            res.render('user/cart', { admin: false, user: true, category, userData, products, cartCount, totalAmount })
        })
    })
}

const changeQuantity = (req, res, next) => {
    userCartModel.changeProductQuantity(req.body).then(async (response) => {
        response.totalAmount = await userCartModel.getTotalAmount(req.body.userID)
        res.json(response)
    })
}

const proceedToPayment = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    categoryController.getCategory().then((category) => {
        userAddressModel.getAddressList(req.session.user._id).then((addressList) => {
            userCartModel.getCartParoducts(req.session.user._id).then((products) => {
                res.render('user/placeorder', { admin: false, user: true, category, userData, cartCount, addressList, products,totalAmount})
            })
        })
    })
}
module.exports = {
    addtoCart,
    showCart,
    changeQuantity,
    proceedToPayment
}