const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    showProductDetails: (productId) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.PRODUCT_DETAILS).findOne({ _id: ObjectID(productId) }).then((result) => {
                resolve(result)
            })
        })
    },
    getProducts:(ID) => {
        return new Promise (async(resolve,reject)=>{
            let products = await db.get().collection(collections.PRODUCT_DETAILS).aggregate([
                {
                    $match: {category_id:ObjectID(ID)}
                }
            ]).toArray()
            resolve(products)
        })
    }
}