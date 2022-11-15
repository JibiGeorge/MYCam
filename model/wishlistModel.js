const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addtoWishlist: (proID, uid) => {
        let productObject = {
            user: uid,
            products: [{ product_ID: ObjectID(proID) }]
        }
        return new Promise(async (resolve, reject) => {
            let userWishlist = await db.get().collection(collections.WISHLIST_COLLECTION).findOne({ user: ObjectID(uid) })
            if (userWishlist) {
                // let productExist = await db.get().collection(collections.WISHLIST_COLLECTION).findOne({product_ID:proID})
                let productExist = await userWishlist.products.findIndex(product => product.product_ID == proID)
                if (productExist != -1) {
                    resolve()
                } else {
                    db.get().collection(collections.WISHLIST_COLLECTION).updateOne({ user: ObjectID(uid) },
                        {
                            $push: {
                                products: productObject.products[0]
                            }
                        }
                    ).then((result) => {
                        resolve(result)
                    })
                }
            } else {
                db.get().collection(collections.WISHLIST_COLLECTION).insertOne(productObject).then((result) => {
                    resolve(result)
                })
            }
        })
    },
    getWishListCount: (uid) => {
        let wishlistcount = 0;
        return new Promise(async (resolve, reject) => {
            let wishlist = await db.get().collection(collections.WISHLIST_COLLECTION).findOne({ user: ObjectID(uid) })
            if (wishlist) {
                wishlistcount = wishlist.products.length;
            }
            resolve(wishlistcount)
        })
    },
    getAllWishList: (uid) => {
        return new Promise(async (resolve, reject) => {
            let wishlist = await db.get().collection(collections.WISHLIST_COLLECTION).aggregate([
                {
                    $match: { user: ObjectID(uid) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_DETAILS,
                        localField: 'products.product_ID',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                }
            ]).toArray()
            resolve(wishlist)
        })
    },
    deleteProduct: (uid, proID) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.WISHLIST_COLLECTION).updateOne(
                { user: ObjectID(uid) },
                {
                    $pull: {
                        products: {
                            product_ID: ObjectID(proID)
                        }
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    }
}