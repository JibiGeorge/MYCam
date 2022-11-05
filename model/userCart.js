const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')
const { response } = require('express')

module.exports = {
    addToCart: (productID, price, userID) => {
        let productObject = {
            item: ObjectID(productID),
            quantity: 1,
            price: parseInt(price)
        }
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collections.CART_COLLECTION).findOne({ user: ObjectID(userID) })

            if (userCart) {
                let productExist = userCart.products.findIndex(product => product.item == productID)
                if (productExist != -1) {
                    db.get().collection(collections.CART_COLLECTION).updateOne({
                        user: ObjectID(userID),
                        'products.item': ObjectID(productID)
                    },
                        {
                            $inc: { 'products.$.quantity': 1 }
                        }).then(() => {
                            resolve()
                        })
                } else {
                    db.get().collection(collections.CART_COLLECTION).updateOne({ user: ObjectID(userID) },
                        {
                            $push: { products: productObject }
                        }
                    ).then((result) => {
                        resolve(result)
                    })
                }
            } else {
                let cartObj = {
                    user: ObjectID(userID),
                    products: [productObject]
                }
                db.get().collection(collections.CART_COLLECTION).insertOne(cartObj).then((result) => {
                    resolve(result)
                })
            }
        })
    },
    getCartParoducts: (userID) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: { user: ObjectID(userID) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity',
                        SumOfProducts: '$products.SumOfProducts'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_DETAILS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'cartItems'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$cartItems', 0] },
                        SumOfProducts: 1
                    }
                }
            ]).toArray()
            resolve(cartItems)
        })
    },
    getCartCount: (userID) => {
        let count = 0;
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(collections.CART_COLLECTION).findOne({ user: ObjectID(userID) })
            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })
    },
    changeProductQuantity: (data) => {
        data.count = parseInt(data.count)
        data.quantity = parseInt(data.quantity)
        data.price = parseInt(data.price)
        return new Promise(async (resolve, reject) => {
            if (data.count == -1 && data.quantity == 1) {
                db.get().collection(collections.CART_COLLECTION).updateOne({ _id: ObjectID(data.cart) },
                    {
                        $pull: { products: { item: ObjectID(data.product) } }
                    }).then((response) => {
                        resolve({ removeProduct: true })
                    })
            } else {
                db.get().collection(collections.CART_COLLECTION).updateOne({
                    _id: ObjectID(data.cart),
                    'products.item': ObjectID(data.product)
                },
                {
                    $inc: {
                        'products.$.quantity': data.count,
                                               
                    },
                    $set:{
                        'products.$.SumOfProducts': (data.quantity+data.count)*data.price
                    }
                }).then((response) => {
                    resolve({ status: true })
                })
            }

        })
    },
    getTotalAmount: (userID) => {
        return new Promise(async (resolve, reject) => {
            let totalAmount = await db.get().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: { user: ObjectID(userID) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_DETAILS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'cartItems'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$cartItems', 0] }
                    }
                },
                // {
                //     $project: {
                //         quantity: 1,
                //         total: {
                //             $sum: {
                //                 $multiply: [
                //                     '$quantity', '$product.selling_Price'
                //                 ]
                //             }
                //         }
                //     }
                // }
                {
                    $group:{
                        _id:"",
                        total: {
                            $sum:{
                                $multiply:[
                                    '$quantity','$product.selling_Price'
                                ]
                        }}
                    }
                }
            ]).toArray()
            console.log(totalAmount[0].total);
            resolve(totalAmount[0].total)
        })
    },
    getCartProductList: (userID) => {
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(collections.CART_COLLECTION).findOne({ user: ObjectID(userID) })
            resolve(cart.products)
        })
    }
}