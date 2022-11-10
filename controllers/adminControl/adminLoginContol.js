const { response } = require('express');
const session = require('express-session');
const adminLoginContol = require('../../model/adminLogin')
const count = require('/Brototype/Week 8/MyCam/model/count')


//For admin Login Page
const adminLoginPage = async(req,res)=>{
    if(req.session.adminloggedIn){
        let totalusers = await count.userCount()
        let totalCategory = await count.categoryCount()
        let totalBrand = await count.brandCount()
        let totalProduct = await count.productCount()
        res.render('admin/adminPanel',{admin:true,title:"Dashboard",user:false,totalusers,totalCategory,totalBrand,totalProduct})
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}
//For admin login to admin panel with predefined credentials
const adminLogin = (req,res)=>{
    adminLoginContol.doLogin(req.body).then(async(response)=>{
        let totalusers = await count.userCount()
        let totalCategory = await count.categoryCount()
        let totalBrand = await count.brandCount()
        let totalProduct = await count.productCount()
        if(response.userFalse){
            return res.render("admin/adminLogin",{admin:false,user:false,errMsg:"User Not Found"})
        }
        
        if(response.status){
            req.session.adminloggedIn = true
            req.session.admin = response.admin
            res.render('admin/adminPanel',{admin:true,title:"Dashboard",user:false,totalusers,totalCategory,totalBrand,totalProduct})
        }
        else{
            return res.render('admin/adminLogin', { admin:false,errMsg: "Invalid Username or Password",user:false})
        }
    })
}
const adminLogout = (req,res)=>{
    req.session.destroy(function (err){
        if(err){
            console.log("Error");
            res.send("Error")
        }else{
            res.redirect('/admin')
        }
    })
}
module.exports = {
    // noPage,
    adminLoginPage,
    adminLogin,
    adminLogout
}