const db = require("../config/connection")
const collections = require("../config/collections")

module.exports = {
    userCount : ()=>{
        return new Promise (async(resolve,reject)=>{
            let totalUsers = await db.get().collection(collections.USER_DETAILS).find().count()
            resolve(totalUsers)
        })
    },
    categoryCount : ()=>{
        return new Promise (async(resolve,reject)=>{
            let totalCategory = await db.get().collection(collections.CATEGORY_DETAILS).find().count()
            resolve(totalCategory)
        })
    },
    brandCount : ()=>{
        return new Promise (async(resolve,reject)=>{
            let totalBrand = await db.get().collection(collections.BRAND_DETAILS).find().count()
            resolve(totalBrand)
        })
    },
    productCount : ()=>{
        return new Promise (async(resolve,reject)=>{
            let totalProducts = await db.get().collection(collections.PRODUCT_DETAILS).find().count()
            resolve(totalProducts)
        })
    }
}