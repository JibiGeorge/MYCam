const { response } = require('express');
const session = require('express-session');
const adminLoginContol = require('../model/adminLogin')

// For No Page Found
// const noPage = (req,res)=>{
//     res.status(404).send('<h1>404! Page not found</h1>');
// }
//For admin Login Page
const adminLoginPage = (req,res)=>{
    if(req.session.loggedIn){
        res.render('admin/adminPanel',{admin:true,title:"Dashboard",user:false})
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}
//For admin login to admin panel with predefined credentials
const adminLogin = (req,res)=>{
    adminLoginContol.doLogin(req.body).then((response)=>{
        if(response.userFalse){
            return res.render("admin/adminLogin",{admin:false,user:false,errMsg:"User Not Found"})
        }
        
        if(response.status){
            req.session.loggedIn = true
            req.session.user = response.user
            res.render('admin/adminPanel',{admin:true,title:"Dashboard",user:false})
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