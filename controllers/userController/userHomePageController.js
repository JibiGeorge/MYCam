const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const homePage = (req,res)=>{
    let userData = req.session.user
    console.log("data",userData);
    categoryController.getCategory().then((category)=>{
        res.render('user/homePage',{admin:false,user:true,category,userData})
    })    
}

module.exports ={
    homePage
}