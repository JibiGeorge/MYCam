const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')
const productModel = require('/Brototype/Week 8/MyCam/model/product')

const homePage = (req,res)=>{
    let userData = req.session.user
    imageSlider.showImages().then((SliderImage)=>{
        categoryController.getCategory().then((category)=>{
            productModel.getFeaturedProducts().then((featuredProducts)=>{
                productModel.getRecentProducts().then((recentProducts)=>{
                    res.render('user/homePage',{admin:false,user:true,category,userData,SliderImage,featuredProducts,recentProducts})
                })
            })
        }) 
    })
       
}

module.exports ={
    homePage
}