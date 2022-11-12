const { ObjectID } = require('bson')
const sliderImageModel = require('../model/sliderImageModel')

const sliderPage = (req, res) => {
        sliderImageModel.showImages().then((sliderImages) => {
            res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
        })
}

const sliderImageAdd = (req, res) => {
        let deflag = 0
        sliderImageModel.addImage({ file_url: req.file.path, file_Name: req.file.filename, caption: req.body.caption, deflag }).then((data) => {
            res.redirect('/admin/silderImage')
        })
}

const updateSlider = (req, res) => {
        let id = req.body.id
        let caption = req.body.caption
        let file_Name = req.file.filename
        let file_url = req.file.path
        sliderImageModel.updateSlider(id, caption, file_Name, file_url).then(() => {
            sliderImageModel.showImages().then((sliderImages) => {
                res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
            })
        })
}

const deleteSlider = (req,res)=>{
    let id = ObjectID(req.body.id)
        sliderImageModel.deleteSlider(id).then((result)=>{
            res.json({status:true})
        })
}

module.exports = {
    sliderPage,
    sliderImageAdd,
    updateSlider,
    deleteSlider
}