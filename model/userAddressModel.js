const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addAddress: (id,data)=>{
        let userID = ObjectID(id)
        let addObj = {
            _id:ObjectID(),
            name:data.name,
            mobile_No:data.mobile_No,
            pin_Code:data.pin_Code,
            locality:data.locality,
            address:data.address,
            city:data.city,
            state:data.state,
            land_Mark:data.land_Mark,
            alter_Mobile:data.alter_Mobile
        }
               
        return new Promise (async(resolve,reject)=>{
            let user = await db.get().collection(collections.USER_ADDRESS_COLLECTION).findOne({user:ObjectID(userID)})

            if(!user){
                let addressObj={
                    user: userID,
                    address: [addObj
                    ]
                }
                db.get().collection(collections.USER_ADDRESS_COLLECTION).insertOne(addressObj).then((result)=>{
                    resolve(result)
                })
            }else{
                db.get().collection(collections.USER_ADDRESS_COLLECTION).updateOne({user:ObjectID(userID)},{
                    $push:{
                        address: addObj
                    },
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
        })
    }
}