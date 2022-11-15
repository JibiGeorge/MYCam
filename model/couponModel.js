const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addCoupon: (data) => {
        let discount_Amount = parseInt(data.discount_Amount);
        let discount_Percentage = parseInt(data.discount_Percentage);
        let coupon_Code = data.coupon_Code.toUpperCase();

        let couponData = {
            offer_Name: data.offer_Name,
            coupon_Code: coupon_Code,
            offer_Type: data.offer_Type,
            offer_Method: data.offer_Method,
            start_Date: startDate,
            end_Date: data.end_Date,
            discount_Amount: discount_Amount ? discount_Amount : 0,
            discount_Percentage: discount_Percentage ? discount_Percentage : 0,
            minimum_Amount: data.minimum_Amount,
            total_User: data.total_User,
            status: "Pending",
            totalUsage: 0
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
    deleteCoupon: (couponID) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.COUPON_COLLECTION).deleteOne({ _id: ObjectID(couponID) }).then((response) => {
                resolve(response)
            })
        })
    },
    updateStatus: (couponID, status) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.COUPON_COLLECTION).updateOne({ _id: ObjectID(couponID) },
                {
                    $set: {
                        status: status
                    }
                }
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    getCouponDetails: (couponCode)=>{
        return new Promise(async(resolve,reject)=>{
            let coupon = await db.get().collection(collections.COUPON_COLLECTION).findOne({coupon_Code:couponCode})
            let user = await db.get().collection(collections.ORDER_COLLECTION).find({coupon:couponCode}).toArray()
            // let data = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
            //     {$match:{coupon:couponCode}},
            //     {
            //         $lookup:{
            //             from: collections.USER_DETAILS,
            //             localField: 'user',
            //             foreignField: '_id',
            //             as: "userDetails"
            //         }
            //     }
            // ]).toArray()
            // console.log("vsadvav",user);
            resolve({coupon,user})
        })
    }
}