const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')
const { response } = require('express')

module.exports={
    addCategory:(categoryData)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.CATEGORY_DETAILS).insertOne(categoryData).then((data)=>{
                resolve.apply(data)
            })
        })
    },
    getCategory:()=>{
        return new Promise (async(resolve,reject)=>{
            let category = await db.get().collection(collections.CATEGORY_DETAILS).find().toArray()
            resolve(category)
        })
    },
    getCategoryDetail: (catId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.CATEGORY_DETAILS).findOne({ _id: ObjectId(catId) }).then((data) => {
                resolve(data)
            })
        })
    },
    updateCategory:(catId, catNewData)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.CATEGORY_DETAILS).updateOne({id: ObjectId(catId)},{
                $set:{
                    categoryName: catNewData.categoryName
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteCategory:(catId)=>{
        return new Promise (async(resolve,reject)=>{
            db.get().collection(collections.CATEGORY_DETAILS).deleteOne({_id:ObjectId(catId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}