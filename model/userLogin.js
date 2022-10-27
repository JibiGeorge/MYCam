const db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')

module.exports = {
    doSignUp: (data)=>{
        return new Promise ((resolve,reject)=>{
            let user = db.get().collection(collections.USER_DETAILS).find({user_Name: data.user_Name})

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
    }
}