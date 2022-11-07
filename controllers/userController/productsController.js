const productsModel = require('/Brototype/Week 8/MyCam/model/userProductModel')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')

const showProducts = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    let categoryID = req.query.id
    productsModel.getProducts(categoryID).then((products) => {
        categoryController.getCategory().then((category) => {
            console.log(products);
            res.render('user/productsList', { admin: false, user: true, category, userData, cartCount,products})
        })
    })
}

module.exports = {
    showProducts
}