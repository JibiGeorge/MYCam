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
                        response.admin = admin
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
                noUser = "User not Found"
                resolve({userFalse:true,noUser})
            }
        })
    }
}