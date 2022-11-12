const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addCoupon: (data) => {
        let discount_Amount = parseInt(data.discount_Amount) 
        let discount_Percentage = parseInt(data.discount_Percentage) 
        let coupon_Code = data.coupon_Code.toUpperCase()

        let couponData = {
            offer_Name: data.offer_Name,
            coupon_Code: coupon_Code,
            offer_Type: data.offer_Type,
            offer_Method: data.offer_Method,
            start_Date: data.start_Date,
            start_Time: data.start_Time,
            end_Date: data.end_Date,
            end_Time: data.end_Time,
            discount_Amount: discount_Amount ? discount_Amount : 0,
            discount_Percentage: discount_Percentage ? discount_Percentage : 0,
            minimum_Amount: data.minimum_Amount,
            total_User: data.total_User,
            status: "pending"
        }
        return new Promise((resolve, reject) => {
            db.get().collection(collections.COUPON_COLLECTION).insertOne(couponData).then((response) => {
                resolve(response)
            })
        })
    },
    getAllCoupons: () => {
        return new Promise(async (resolve, reject) => {
            let coupons_list = await db.get().collection(collections.COUPON_COLLECTION).find().toArray()
            resolve(coupons_list)
        })
    },
    deleteCoupon: (couponID)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.COUPON_COLLECTION).deleteOne({_id:ObjectID(couponID)}).then((response)=>{
                resolve(response)
            })
        })
    }
}