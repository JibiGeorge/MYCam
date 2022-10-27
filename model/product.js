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
    getProducts:()=>{
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
    },
    getProductDetail:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_DETAILS).findOne({_id: ObjectId(proId)}).then((data)=>{
                resolve(data)
            })
        })
    },
    updateProduct:(proId,data,image)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.PRODUCT_DETAILS).updateOne({_id: ObjectId(proId)},{
                $set: {
                    product_Name: data.product_Name,
                    category_Name: data.category_Name,
                    brand: data.brand,
                    actual_Price: data.actual_Price,
                    selling_Price: data.selling_Price,
                    stock_In_Hand: data.stock_In_Hand,
                    description: data.description,
                    specification: data.specification,
                    productImage: image
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    }
}