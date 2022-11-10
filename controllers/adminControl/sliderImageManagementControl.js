const { ObjectID } = require('bson')
const sliderImageModel = require('/Brototype/Week 8/MyCam/model/sliderImageModel')

const sliderPage = (req, res) => {
    if (req.session.adminloggedIn) {
        sliderImageModel.showImages().then((sliderImages) => {
            res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
        })
    } else {
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

const sliderImageAdd = (req, res) => {
    if (req.session.adminloggedIn) {
        let deflag = 0
        sliderImageModel.addImage({ file_url: req.file.path, file_Name: req.file.filename, caption: req.body.caption, deflag }).then((data) => {
            res.redirect('/admin/silderImage')
        })
    } else {
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

const updateSlider = (req, res) => {
    if (req.session.adminloggedIn) {
        let id = req.body.id
        let caption = req.body.caption
        let file_Name = req.file.filename
        let file_url = req.file.path
        sliderImageModel.updateSlider(id, caption, file_Name, file_url).then(() => {
            sliderImageModel.showImages().then((sliderImages) => {
                res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
            })
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

const deleteSlider = (req,res)=>{
    let id = ObjectID(req.body.id)
    if(req.session.adminloggedIn){
        sliderImageModel.deleteSlider(id).then((result)=>{
            res.json({status:true})
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

module.exports = {
    sliderPage,
    sliderImageAdd,
    updateSlider,
    deleteSlider
}