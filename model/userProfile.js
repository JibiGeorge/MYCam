const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')

module.exports = {
    updateProfile: (uid, data) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.USER_DETAILS).updateOne({ _id: uid },
                {
                    $set: {
                        first_Name: data.first_Name,
                        last_Name: data.last_Name,
                        user_Name: data.user_Name,
                        gender: data.gender
                    }
                }).then((response) => {
                    resolve(response)
                })
        })
    },
    getUserDetails: (uid) => {
        return new Promise(async (resolve, reject) => {
            let userDetails = await db.get().collection(collections.USER_DETAILS).findOne({ _id: uid })
            resolve(userDetails)
        })
    },
    updateEmailPhone: (uid, data) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collections.USER_DETAILS).updateOne({ _id: uid },
                {
                    $set: {
                        mobile_No: data.mobile_No,
                        user_Email: data.user_Email
                    }
                }).then((response) => {
                    resolve(response)
                })
        })
    },
    getAddressDetails: (addressID, addressDocId, uid) => {
        return new Promise(async (resolve, reject) => {
            let addressData = await db.get().collection(collections.USER_ADDRESS_COLLECTION).aggregate([
                {
                    $match: {
                        _id: ObjectId(addressDocId)
                    }
                },
                {
                    $unwind: '$address'
                },
                {
                    $project: {
                        _id: 1,
                        address: 1
                    }
                },
                {
                    $match: {
                        'address._id': ObjectId(addressID)
                    }
                }
            ]).toArray()
            resolve(addressData)
        })
    },
    deleteAddress: (userID, addressID, addressDocID) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_ADDRESS_COLLECTION).updateOne(
                { _id: ObjectId(addressDocID), user: userID },
                {
                    $pull: {
                        address: { _id: ObjectId(addressID) }
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    },
    updateAddress: (userID, addressID, addressDocID, data) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_ADDRESS_COLLECTION).updateOne(
                { _id: ObjectId(addressDocID), user: userID, 'address._id': ObjectId(addressID) },
                {
                    $set: {
                        'address.$.name': data.name,
                        'address.$.mobile_No': data.mobile_No,
                        'address.$.pin_Code': data.pin_Code,
                        'address.$.locality': data.locality,
                        'address.$.address': data.address,
                        'address.$.city': data.city,
                        'address.$.state': data.state,
                        'address.$.land_Mark': data.land_Mark,
                        'address.$.alter_Mobile': data.alter_Mobile
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    },
    updatePassword: async(uid, password) => {
        password.password = await bcrypt.hash(password.password, 10)
        console.log(password.password);
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.USER_DETAILS).updateOne(
                { _id: uid },
                {
                    $set: {
                        password: password.password
                    }
                }
            ).then((response)=>{
                resolve(response)
            })
        })
    }
}