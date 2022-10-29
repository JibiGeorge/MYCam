const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')

const homePage = (req,res)=>{
    let userData = req.session.user
    imageSlider.showImages().then((SliderImage)=>{
        categoryController.getCategory().then((category)=>{
            res.render('user/homePage',{admin:false,user:true,category,userData,SliderImage})
        }) 
    })
       
}

module.exports ={
    homePage
}