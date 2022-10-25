const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')

module.exports = {
    addProduct:(imageID,productData)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.PRODUCT_DETAILS).insertOne(imageID,productData).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    getProduct:()=>{
        return new Promise (async(resolve,reject)=>{
            let product = await db.get().collection(collections.PRODUCT_DETAILS).find().toArray()
            resolve(product)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.PRODUCT_DETAILS).deleteOne({_id:ObjectId(proId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}