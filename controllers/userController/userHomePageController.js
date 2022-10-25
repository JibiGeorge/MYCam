const homePage = (req,res)=>{
    res.render('user/homePage',{admin:false,user:true})
}

module.exports ={
    homePage
}