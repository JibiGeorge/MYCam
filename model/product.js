const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')

module.exports = {
    addProduct: (imageID, categoryID, BrandID, productData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.PRODUCT_DETAILS).insertOne(imageID, categoryID, BrandID, productData).then((data) => {
                resolve.apply(data)
            })
        })
    },
    getProducts: () => {
        return new Promise(async (resolve, reject) => {
            let productItems = await db.get().collection(collections.PRODUCT_DETAILS).aggregate([
                {
                    $lookup: {
                        from: collections.CATEGORY_DETAILS,
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'categoryItem'
                    }
                },
                {
                    $lookup: {
                        from: collections.BRAND_DETAILS,
                        localField: 'brand_id',
                        foreignField: '_id',
                        as: 'brandItem'
                    }
                }
            ]).toArray()
            resolve(productItems)
        })
    },
    deleteProduct: (proId) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.PRODUCT_DETAILS).deleteOne({ _id: ObjectId(proId) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProductDetail: (proId) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collections.PRODUCT_DETAILS).aggregate([
                {
                    $match: {
                        _id: ObjectId(proId)
                    }
                },
                {
                    $lookup: {
                        from: collections.CATEGORY_DETAILS,
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $lookup: {
                        from: collections.BRAND_DETAILS,
                        localField: 'brand_id',
                        foreignField: '_id',
                        as: 'brandItem'
                    }
                }
            ]).toArray()
            console.log(product);
            resolve(product)
        })
    },
    updateProduct: (proId, data, fie_Name, file_url, categoryID, brandID) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.PRODUCT_DETAILS).updateOne({ _id: ObjectId(proId) }, {
                $set: {
                    product_Name: data.product_Name,
                    category_id: categoryID,
                    brand_id: brandID,
                    actual_Price: data.actual_Price,
                    selling_Price: data.selling_Price,
                    stock_In_Hand: data.stock_In_Hand,
                    description: data.description,
                    specification: data.specification,
                    fie_Name: fie_Name,
                    file_url:file_url
                }
            }).then((response) => {
                resolve(response)
            })
        })
    },
    getFeaturedProducts: () => {
        return new Promise(async (resolve, reject) => {
            let featuredProducts = await db.get().collection(collections.PRODUCT_DETAILS).find({ feature_or_recent: "Featured Products" }).toArray()
            resolve(featuredProducts)
        })
    },
    getRecentProducts: () => {
        return new Promise(async (resolve, reject) => {
            let recentProducts = await db.get().collection(collections.PRODUCT_DETAILS).find({ feature_or_recent: "Recent Products" }).toArray()
            resolve(recentProducts)
        })
    }
}