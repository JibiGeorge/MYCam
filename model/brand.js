const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')

module.exports={
    addBrandDetails:(brandData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.BRAND_DETAILS).insertOne(brandData).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    getAllBrand:()=>{
        return new Promise(async(resolve,reject)=>{
            let brands = await db.get().collection(collections.BRAND_DETAILS).find().toArray()
            resolve(brands)
        })
    },
    getBrandDetail: (brandId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.BRAND_DETAILS).findOne({ _id: ObjectId(brandId) }).then((data) => {
                resolve(data)
            })
        })
    } ,
    updateBrand:(brandId, brandNewData)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.BRAND_DETAILS).updateOne({_id: ObjectId(brandId)},{
                $set:{
                    brandName: brandNewData
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteBrand:(brandId)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.BRAND_DETAILS).deleteOne({_id:ObjectId(brandId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}