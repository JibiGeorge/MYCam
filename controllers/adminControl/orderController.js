const orderModel = require('/Brototype/Week 8/MyCam/model/orderModel')
const orderPage = (req,res)=>{
    if (req.session.adminloggedIn) {
            res.render('admin/productOrder', { admin: true, title:"Orders",user:false})
    } else {
        res.render('admin/adminLogin', { admin: false,user:false })
    }
}

module.exports={
    orderPage
}