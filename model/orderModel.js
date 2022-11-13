const db = require('../config/connection')
const collections = require('../config/collections');
const { ObjectId } = require('mongodb');
const Razorpay = require('razorpay')
require('dotenv').config();

var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

module.exports = {
    placeOrder: (orderDetails, total, userID, finalPrice, coupon, discountAmount) => {
        return new Promise(async (resolve, reject) => {
            let cartProducts = await db.get().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: { user: ObjectId(userID) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_DETAILS,
                        localField: 'products.item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity',
                        SumOfProducts: '$products.SumOfProducts',
                        product: 1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        quantity: 1,
                        productDetails: { $arrayElemAt: ['$product', 0] }
                    }
                }

            ]).toArray()

            let status = orderDetails.paymentMethod === 'COD' ? 'placed' : 'pending'
            let orderObj = {
                deliveryDetails: orderDetails.address,
                user: ObjectId(orderDetails.userID),
                paymentMethod: orderDetails.paymentMethod,
                product: cartProducts,
                totalAmount: total,
                discountAmount: discountAmount,
                finalPrice: finalPrice,
                coupon: coupon,
                status: status,
                date: new Date(),
                expected_Date: new Date(+ new Date() + 7 * 40 * 24 * 60 * 1000)
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
            ]).toArray()
            resolve(productList)

        })
    },
    getOrderedProductDetails: (id) => {
        return new Promise(async (resolve, reject) => {
            let productDetail = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        _id: ObjectId(id)
                    }
                },
                {
                    $unwind: '$product'
                }
            ]).toArray()
            resolve(productDetail)
        })
    },
    getAllOrders: () => {
        return new Promise(async (resolve, reject) => {
            let ordersList = await db.get().collection(collections.ORDER_COLLECTION).find().toArray()
            if (ordersList.length > 0) {
                let user = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                    {
                        $lookup: {
                            from: collections.USER_DETAILS,
                            localField: 'user',
                            foreignField: '_id',
                            as: 'userDetails'
                        }
                    }
                ]).toArray()
                resolve({ user })
            } else {
                console.log("Empty");
                resolve({ ordersEmpty: true })
            }
        })
    },
    getOrderDetails: (orderID) => {
        return new Promise(async (resolve, reject) => {
            let orderDetails = await db.get().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match: { _id: ObjectId(orderID) }
                },
                {
                    $lookup: {
                        from: collections.USER_DETAILS,
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                }
            ]).toArray()
            resolve(orderDetails)
        })
    },
    updateOrderDetails: (data) => {
        return new Promise(async (resolve, reject) => {
            let orderId = ObjectId(data.id)
            let status = data.status;
            let description = data.description;
            db.get().collection(collections.ORDER_COLLECTION).updateOne(
                {
                    _id: orderId
                },
                {
                    $set: {
                        status: status,
                        description: description
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    },
    cancelOrder: (orderID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.ORDER_COLLECTION).updateOne(
                {
                    _id: ObjectId(orderID)
                },
                {
                    $set: {
                        status: "cancelled"
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    }
}