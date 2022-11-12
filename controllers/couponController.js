const couponModel = require('../model/couponModel')

const getCouponPage = (req,res)=>{
        couponModel.getAllCoupons().then((coupons_list)=>{
            res.render('admin/couponPage',{admin:true,title:"coupon",user:false,coupons_list})
        })
}

const createPage = (req,res)=>{
        res.render('admin/createCoupon',{admin:true,user:false,title:"Create Coupon"})
}

const addCoupon =(req,res)=>{
        let couponData = req.body
        couponModel.addCoupon(couponData).then((response)=>{
            res.json(response)
        })
}

const deleteCoupon = (req,res)=>{
    let couponID = req.body.couponID
    couponModel.deleteCoupon(couponID).then((response)=>{
        res.json(response)
    })
}

module.exports ={
    getCouponPage,
    createPage,
    addCoupon,
    deleteCoupon
}