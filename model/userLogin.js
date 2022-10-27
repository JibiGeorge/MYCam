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
    },
    doLogin: (userLoginData)=>{
        return new Promise (async(resolve,reject)=>{
            let user = await db.get().collection(collections.USER_DETAILS).findOne({user_Email:userLoginData.user_Email})

            if(user){
                bcrypt.compare(userLoginData.password, user.password).then((status)=>{
                    if(status){
                        console.log("Login Success");
                        response.user = admin
                        response.status = true
                        resolve(response)
                    }else{
                        console.log("Password Wrong");
                        resolve({status:false})
                    }
                })
            }else{
                response.passwordError=true
                console.log("User not found");
                resolve({userFalse:true,noUser})
            }
        })
    }
}