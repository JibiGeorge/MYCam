const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports={
    addToCart:(productID,userID)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collections.CART_COLLECTION).findOne({user:ObjectID(userID)})

            if(userCart){
                db.get().collection(collections.CART_COLLECTION).updateOne({user:ObjectID(userID)},
                {
                    
                        $push:{products:ObjectID(productID)}
                    
                }
                ).then((result)=>{
                    resolve(result)
                })
            }else{
                let cartObj = {
                    user:ObjectID(userID),
                    products:[ObjectID(productID)]
                }
                db.get().collection(collections.CART_COLLECTION).insertOne(cartObj).then((result)=>{
                    resolve(result)
                })
            }
        })
    }
}