const db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')

module.exports = {
    doSignUp: (data)=>{
        return new Promise (async(resolve,reject)=>{
            data.password = await bcrypt.hash(data.password, 10)
            data.confirm_Password = await bcrypt.hash(data.confirm_Password, 10)
            let user = await db.get().collection(collections.USER_DETAILS).findOne({user_Name: data.user_Name})

            if(!user){
                db.get().collection(collections.USER_DETAILS).insertOne(data).then((result)=>{
                    resolve.apply(data)
                })
            }else{
                console.log("User Already Exist");
                response.userexist = true
                resolve(response)
            }
            
        })        
    },
    showUsers: ()=>{
        return new Promise (async(resolve,reject)=>{
            let users = await db.get().collection(collections.USER_DETAILS).find().toArray()
            resolve(users)
        })
    }
}