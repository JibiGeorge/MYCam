const adminSession = (req,res,next)=>{
    if(req.session.adminloggedIn){
        next()
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

module.exports = {adminSession}