const userAddressModel = require('../model/userAddressModel')
const userCartModel = require('../model/userCart')
const categoryController = require('../model/category')

const addAddress = (req,res)=>{
    let data= req.body
    userAddressModel.addAddress(req.session.user._id,data).then(()=>{
        res.json({status:true})
    })
}
const getAddressPage = async (req,res)=>{
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        res.render('user/billingAddress', { admin: false, user: true, category, userData, cartCount })
    })
}

module.exports = {
    addAddress,
    getAddressPage
}