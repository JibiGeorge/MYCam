const db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')
const { ObjectID } = require('bson')

module.exports = {
    doSignUp: (data) => {
        return new Promise(async (resolve, reject) => {
            data.password = await bcrypt.hash(data.password, 10)
            let user = await db.get().collection(collections.USER_DETAILS).findOne({ user_Email: data.user_Email })

            if (!user) {
                let user = await db.get().collection(collections.USER_DETAILS).insertOne(data)
                resolve(data)
            } else {
                console.log("User Already Exist");
                response.userexist = true
                resolve(response)
            }

        })
    },
    showUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collections.USER_DETAILS).find().toArray()
            resolve(users)
        })
    },
    doLogin: (userLoginData) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collections.USER_DETAILS).findOne({ user_Email: userLoginData.user_Email })
            if (user) {
                let success = await db.get().collection(collections.USER_DETAILS).find({$and:[
                    {
                        verified: 1
                    },
                    {
                        state: "active"
                    }
                ] })
                if (success) {
                    bcrypt.compare(userLoginData.password, user.password).then((status) => {
                        if (status) {
                            console.log("Login Success");
                            response.user = user
                            response.status = true
                            resolve(response)
                        } else {
                            console.log("Password Wrong");
                            resolve({ status: false })
                        }
                    })
                } else {
                    console.log("Not Verified  or your account has blocked");
                    resolve({ verified: false })
                }

            } else {
                response.passwordError = true
                console.log("User not found");
                resolve({ userFalse: true })
            }
        })
    },
    blockUser: (userID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.USER_DETAILS).updateOne({
                _id: ObjectID(userID)
            },
                {
                    $set: {
                        state: "blocked"
                    }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    },
    unBlockUser: (userID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.USER_DETAILS).updateOne(
                { _id: ObjectID(userID) },
                {
                    $set: { state: "active" }
                }).then((response) => {
                    resolve(response)
                })
        })
    }
}