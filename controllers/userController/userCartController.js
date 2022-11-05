const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userAddressModel = require('/Brototype/Week 8/MyCam/model/userAddressModel')

const addtoCart = (req, res) => {
    // console.log("vsdvs");
    // console.log(req.body);
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
    userCartModel.getTotalAmount(userData._id).then((totalAmount)=>{        
        // console.log("result",totalAmount);
        userCartModel.getCartParoducts(req.session.user._id).then((products) => {
            // console.log("vadvav",products);
            categoryController.getCategory().then((category) => {
                res.render('user/cart', { admin: false, user: true, category, userData, products, cartCount,totalAmount})
            })
        })
    })
    // totalAmount = totalAmount > 0 ? totalAmount : 0;
    // totalAmount = totalAmount[0].total
    // console.log("result",totalAmount);
    
}

const changeQuantity = (req, res, next) => {
    let userData = req.session.user
    // console.log(req.body);
    userCartModel.changeProductQuantity(req.body).then(async (response) => {
        userCartModel.getTotalAmount(userData._id).then((totalAmount)=>{ 
        res.json({response,totalAmount})
        })
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