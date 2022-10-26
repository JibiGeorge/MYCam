const categoryController = require('/Brototype/Week 8/MyCam/model/category')

const homePage = (req,res)=>{
    categoryController.getCategory().then((category)=>{
        res.render('user/homePage',{admin:false,user:true,category})
    })    
}

module.exports ={
    homePage
}