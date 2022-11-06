const orderModel = require('/Brototype/Week 8/MyCam/model/orderModel')
const orderPage = (req, res) => {
    if (req.session.adminloggedIn) {
        orderModel.getAllOrders().then((response) => {
            res.render('admin/productOrder', { admin: true, title: "Orders", user: false, response })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

// const productDetails = (req, res) => {
//     console.log(req.query.order);
//     let orderID = req.query.order
//     if (req.session.adminloggedIn) {
//         orderModel.getOrderDetails(orderID)
//     } else {
//         res.render('admin/adminLogin', { admin: false, user: false })
//     }
// }

const orderDetails = (req,res)=>{
    let orderID = req.query.id
    if (req.session.adminloggedIn) {
        orderModel.getOrderDetails(orderID).then((orderDetails)=>{
            let orders = orderDetails[0] ? orderDetails[0] : "";
            res.render('admin/orderDetailsPage',{admin: true, user: false,title:"Order Details",orders})
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

const updateOrderDetails = (req,res)=>{
    if(req.session.adminloggedIn){
        orderModel.updateOrderDetails(req.body).then((response)=>{
            res.send(response)
        })
    }else{
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

module.exports = {
    orderPage,
    orderDetails,
    updateOrderDetails
}