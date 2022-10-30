const categoryModel = require('../../model/category')
const authencation = require('../../config/connection')

const categoryPage = (req, res) => {
    if (req.session.adminloggedIn) {
        categoryModel.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData: false ,title:"Category",user:false})
        })
    } else {
        res.render('admin/adminLogin', { admin: false,user:false })
    }
}
const addCategory = (req, res) => {
    if (req.session.adminloggedIn) {
        categoryModel.addCategory({categoryPicture:req.file.filename,categoryName:req.body.categoryName}).then((data) => {
            res.redirect('/admin/Category')
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const getCategoryDetail = async (req, res) => {
    let categoryId = req.query.id
    let categoryData = await categoryModel.getCategoryDetail(categoryId)
    if (req.session.adminloggedIn) {
        categoryModel.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData  ,title:"Category",user:false})
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const updateCategoryDetail = (req, res) => {
    console.log(req.body);
    let id = req.body.categoryID;
    let categoryName = req.body.categoryName
    let categoryPicture =req.file.filename
    if (req.session.adminloggedIn) {
        categoryModel.updateCategory(id,categoryName,categoryPicture).then(() => {
            res.redirect('/admin/Category')
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const deleteCategory = (req, res) => {
    if (req.session.adminloggedIn) {
        categoryModel.deleteCategory(req.query.id).then((response) => {
            res.redirect('/admin/category')
        })
    } else {
        res.render('admin/adminLogin', { admin: false,user:false })
    }
}


module.exports = {
    categoryPage,
    addCategory,
    getCategoryDetail,
    updateCategoryDetail,
    deleteCategory
}