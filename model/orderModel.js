const db = require('../config/connection')
const collections = require('../config/collections');
const { ObjectId } = require('mongodb');

module.exports = {
    placeOrder:(orderDetails,products,total)=>{
        return new Promise((resolve,reject)=>{
            let status = orderDetails.paymentMethod === 'COD'?'placed':'pending'
            let orderObj ={
                deliveryDetails:{
                    mobile:orderDetails.address,
                },
                user: ObjectId(orderDetails.userID),
                paymentMethod: orderDetails.paymentMethod,
                products:products,
                totalAmount:total,
                status: status,
                date:new Date()
            }
            db.get().collection(collections.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
                db.get().collection(collections.CART_COLLECTION).deleteOne({user:ObjectId(orderDetails.userID)})
                resolve()
            })
        })
    }
}