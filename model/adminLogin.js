const db = require('../config/connection')
const bcrypt = require('bcrypt')
const collections = require('../config/collections')

module.exports = {
    doLogin:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let response = {}
            let admin =await db.get().collection(collections.ADMIN_CREDNTIALS).findOne({userName: data.userName})
            if(admin){
                bcrypt.compare(data.password, admin.Password).then((status)=>{
                    if(status){
                        console.log("Login Sucess");
                        response.user = admin
                        response.status = true
                        resolve(response)
                    }else{
                        response.passwordError=true
                        console.log("Password Wrong");
                        resolve({status:false})
                    }
                })
            }else{
                response.passwordError=true
                console.log("User not found");
                resolve({status:false})
            }
        })
    }
}