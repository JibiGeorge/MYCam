const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')
const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userAddressModel = require('/Brototype/Week 8/MyCam/model/userAddressModel')
const userDataModel = require('/Brototype/Week 8/MyCam/model/userProfile')


const showProfilePage = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then(async (category) => {
        let userDetails = await userDataModel.getUserDetails(userData._id)
        res.render('user/userProfile', { admin: false, user: true, category, userData, cartCount, userDetails })
    })
}

const showAddress = async (req, res) => {
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    categoryController.getCategory().then((category) => {
        userAddressModel.getAddressList(userData._id).then((addressList) => {
            res.json({ addressList })
        })
    })
}

const updateProfile = (req, res) => {
    let userData = req.session.user
    userDataModel.updateProfile(userData._id, req.body).then((response) => {
        res.json(response)
    })
}

const updateEmailPhone = (req, res) => {
    let userData = req.session.user
    userDataModel.updateEmailPhone(userData._id, req.body).then((response) => {
        res.json(response)
    })
}

const addressEditPage = async (req, res) => {
    let addressID = req.query.addressID
    let addressDocId = req.query.addressDoc
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartModel.getCartCount(req.session.user._id)
    }
    userDataModel.getAddressDetails(addressID, addressDocId, userData._id).then((addressDetails) => {
        let address = addressDetails[0] ? addressDetails[0].address : "";
        let addressID = addressDetails[0] ? addressDetails[0]._id : "";
        categoryController.getCategory().then(async (category) => {
            res.render('user/updateBillingAddress', { admin: false, user: true, userData, cartCount, address, category, addressID })
        })
    })
}

const addressDelete = (req, res) => {
    let userID = req.session.user._id
    let addressID = req.body.addressID
    let addressDocID = req.body.addressDocID
    userDataModel.deleteAddress(userID, addressID, addressDocID).then((response)=>{
        res.json(response)
    })
}

const updateAddress = (req,res)=>{
    let userID = req.session.user._id
    let addressID = req.body.addressID
    let addressDocID = req.body.addressDocID
    userDataModel.updateAddress(userID,addressID,addressDocID,req.body).then((response)=>{
        res.redirect('/userProfile')
    })
}

const updatePassword = (req,res)=>{
    let userID = req.session.user._id
    userDataModel.updatePassword(userID,req.body).then((response)=>{
        res.json(response)
    })
}


module.exports = {
    showProfilePage,
    showAddress,
    updateProfile,
    updateEmailPhone,
    addressEditPage,
    updateAddress,
    addressDelete,
    updatePassword
}