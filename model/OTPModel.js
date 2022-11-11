const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    updateVerification:(userID)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.USER_DETAILS).updateOne({_id:ObjectID(userID)},
            {
                $set:{
                    verified:1,
                    state:"active"
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
}