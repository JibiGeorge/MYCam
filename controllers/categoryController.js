const categoryModel = require('../model/category')
const authencation = require('../config/connection')

const categoryPage = (req, res) => {
        categoryModel.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData: false ,title:"Category",user:false})
        })
}
const addCategory = (req, res) => {
        categoryModel.addCategory({file_url:req.file.path,file_Name:req.file.filename,categoryName:req.body.categoryName}).then((data) => {
            res.redirect('/admin/Category')
        })
}
const getCategoryDetail = async (req, res) => {
    let categoryId = req.query.id
    let categoryData = await categoryModel.getCategoryDetail(categoryId)
        categoryModel.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData  ,title:"Category",user:false})
        })
}
const updateCategoryDetail = (req, res) => {
    let id = req.body.categoryID;
    let categoryName = req.body.categoryName
    let file_Name =req.file.filename
    let file_url = req.file.path
        categoryModel.updateCategory(id,categoryName,file_Name,file_url).then(() => {
            res.redirect('/admin/Category')
        })
}
const deleteCategory = (req, res) => {
        categoryModel.deleteCategory(req.query.id).then((response) => {
            res.redirect('/admin/category')
        })
}


module.exports = {
    categoryPage,
    addCategory,
    getCategoryDetail,
    updateCategoryDetail,
    deleteCategory
}