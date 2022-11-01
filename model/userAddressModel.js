const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addAddress: (id,data)=>{
        let userID = ObjectID(id)
               
        return new Promise (async(resolve,reject)=>{
            let user = await db.get().collection(collections.USER_ADDRESS_COLLECTION).findOne({user:ObjectID(userID)})

            if(!user){
                let addressObj={
                    user: userID,
                    address: [data]
                }
                db.get().collection(collections.USER_ADDRESS_COLLECTION).insertOne(addressObj).then((result)=>{
                    resolve(result)
                })
            }else{
                db.get().collection(collections.USER_ADDRESS_COLLECTION).updateOne({user:ObjectID(userID)},{
                    $push:{
                        address: data
                    }
                }).then((result)=>{
                    resolve(result)
                })
            }

        })
    },
    getAddressList: (id)=>{
        return new Promise (async (resolve,reject)=>{
            await db.get().collection(collections.USER_ADDRESS_COLLECTION).findOne({user:ObjectID(id)}).then((result)=>{
                resolve(result)
            })
            // console.log(addressList.address[0]);
        })
    }
}