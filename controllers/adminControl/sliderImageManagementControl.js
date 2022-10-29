const { ObjectID } = require('bson')
const sliderImageModel = require('/Brototype/Week 8/MyCam/model/sliderImageModel')

const sliderPage = (req, res) => {
    if (req.session.loggedIn) {
        sliderImageModel.showImages().then((sliderImages) => {
            res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
        })
    } else {
        res.redirect('/admin')
    }
}

const sliderImageAdd = (req, res) => {
    if (req.session.loggedIn) {
        let deflag = 0
        sliderImageModel.addImage({ sliderImage: req.file.filename, caption: req.body.caption, deflag }).then((data) => {
            res.redirect('/admin/silderImage')
        })
    } else {
        res.redirect('/admin')
    }
}

const updateSlider = (req, res) => {
    if (req.session.loggedIn) {
        let id = req.body.id
        let caption = req.body.caption
        let image = req.file.filename
        sliderImageModel.updateSlider(id, caption, image).then(() => {
            sliderImageModel.showImages().then((sliderImages) => {
                res.render('admin/sliderImage', { admin: true, user: false, title: "User Home Page Slider Image", sliderImages })
            })
        })
    }
}

const deleteSlider = (req,res)=>{
    let id = ObjectID(req.body.id)
    sliderImageModel.deleteSlider(id).then((result)=>{
        res.redirect('/admin/silderImage')
    })
}

module.exports = {
    sliderPage,
    sliderImageAdd,
    updateSlider,
    deleteSlider
}