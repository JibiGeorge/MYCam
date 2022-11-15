const couponModel = require('../model/couponModel')

const getCouponPage = (req, res) => {
    couponModel.getAllCoupons().then((coupons_list) => {
        res.render('admin/couponPage', { admin: true, title: "coupon", user: false, coupons_list })
    })
}

const createPage = (req, res) => {
    res.render('admin/createCoupon', { admin: true, user: false, title: "Create Coupon" })
}

const addCoupon = (req, res) => {
    let couponData = req.body
    couponModel.addCoupon(couponData).then((response) => {
        res.json(response)
    })
}

const deleteCoupon = (req, res) => {
    let couponID = req.body.couponID
    couponModel.deleteCoupon(couponID).then((response) => {
        res.json(response)
    })
}

const updateStatus = (req, res) => {
    let couponID = req.body.couponID
    let status = req.body.status
    couponModel.updateStatus(couponID, status).then((response) => {
        res.json(response)
    })
}

const getCouponDetails = (req,res)=>{
    let c_code = req.query.coupon_Code
    couponModel.getCouponDetails(c_code).then((details)=>{
        res.render('admin/couponDetail',{ admin: true, user: false, title: "Coupon Details" ,details})
    })
}

module.exports = {
    getCouponPage,
    createPage,
    addCoupon,
    deleteCoupon,
    updateStatus,
    getCouponDetails
}