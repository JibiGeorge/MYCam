const db = require('../config/connection')
const collections = require('../config/collections');
const { ObjectId } = require('mongodb');
const Razorpay = require('razorpay')
require('dotenv').config();

var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

module.exports = {
    placeOrder: (orderDetails, products, total) => {
        return new Promise((resolve, reject) => {
            let status = orderDetails.paymentMethod === 'COD' ? 'placed' : 'pending'
            let orderObj = {
                deliveryDetails: {
                    address: orderDetails.address,
                },
                user: ObjectId(orderDetails.userID),
                paymentMethod: orderDetails.paymentMethod,
                products: products,
                totalAmount: total,
                status: status,
                date: new Date()
            }
            db.get().collection(collections.ORDER_COLLECTION).insertOne(orderObj).then((response) => {
                db.get().collection(collections.CART_COLLECTION).deleteOne({ user: ObjectId(orderDetails.userID) })
                resolve(response.insertedId)
            })
        })
    },
    generateRazorPay: (orderID, totalPrice) => {
        return new Promise((resolve, reject) => {
            var options = {
                amount: totalPrice,
                currency: "INR",
                receipt: "" + orderID
            };
            instance.orders.create(options, function (err, order) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("New Order:", order);
                    resolve(order)
                }
            })
        })
    },
    getOrderList: (userId) => {
        return new Promise(async (resolve, reject) => {
            let productList = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match: { user: ObjectId(userId) }
                },
                {
                    $lookup:{
                        from: collections.PRODUCT_DETAILS,
                        localField: 'products.item',
                        foreignField: '_id',
                        as: 'products'
                    }
                }
            ]).toArray()
            console.log(productList);
            resolve(productList)

        })
    },
    getOrderedProductDetails: (id)=>{
        return new Promise (async(resolve,reject)=>{
            let productDetail = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match:{
                        _id:ObjectId(id)
                    }
                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup:{
                        from: collections.PRODUCT_DETAILS,
                        localField: 'products.item',
                        foreignField: '_id',
                        as: 'product'
                    }
                }
            ]).toArray()
            resolve(productDetail)
        })
    }
}