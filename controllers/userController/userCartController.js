const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const addtoCart = (req, res) => {
    console.log('api call');
    console.log(req.session.user._id);
    userCartModel.addToCart(req.params.id, req.session.user._id).then(() => {
        // res.redirect('/')
        res.json({status:true})
    })
}

const showCart = async (req, res) => {
    let userData = req.session.user
    let cartCount=null;
    console.log(userData);
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(userData._id)
    }
    let totalAmount = await userCartModel.getTotalAmount(userData._id)
    userCartModel.getCartParoducts(req.session.user._id).then((products)=>{
        categoryController.getCategory().then((category) => {
            res.render('user/cart', { admin: false, user: true, category, userData, products, cartCount,totalAmount})
        })
    })
}

const changeQuantity = (req,res,next)=>{
    console.log(req.body);
    userCartModel.changeProductQuantity(req.body).then(async(response)=>{
        response.totalAmount = await userCartModel.getTotalAmount(req.body.userID)
        res.json(response)
    })
}

const proceedToPayment = async (req,res)=>{
    console.log("adca");
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    console.log("count", cartCount);
    categoryController.getCategory().then((category) => {
        res.render('user/placeorder', { admin: false, user: true, category, userData, cartCount })
        // res.json({status:true})
    })
}
module.exports = {
    addtoCart,
    showCart,
    changeQuantity,
    proceedToPayment
}