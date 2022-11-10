

const getCouponPage = (req,res)=>{
    if(req.session.adminloggedIn){
    res.render('admin/couponPage',{admin:true,title:"coupon",user:false})
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

module.exports ={
    getCouponPage
}