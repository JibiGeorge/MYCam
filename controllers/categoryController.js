const categoryController = require('../model/category')

const categoryPage = (req, res) => {
    if (req.session.loggedIn) {
        categoryController.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData: false ,title:"Category",user:false})
        })
    } else {
        res.render('admin/adminLogin', { admin: false,user:false })
    }
}
const addCategory = (req, res) => {
    if (req.session.loggedIn) {
        categoryController.addCategory(req.body).then((data) => {
            res.redirect('/admin/Category')
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const getCategoryDetail = async (req, res) => {
    let categoryId = req.query.id
    let categoryData = await categoryController.getCategoryDetail(categoryId)
    if (req.session.loggedIn) {
        categoryController.getCategory().then((category) => {
            res.render('admin/category', { admin: true, category, categoryData  ,title:"Category",user:false})
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const updateCategoryDetail = (req, res) => {
    if (req.session.loggedIn) {
        categoryController.updateCategory(req.params.id, req.body).then(() => {
            res.redirect('/admin/Category')
        })
    } else {
        res.render('admin/adminLogin', { admin: false ,user:false})
    }
}
const deleteCategory = (req, res) => {
    if (req.session.loggedIn) {

        categoryController.deleteCategory(req.query.id).then((response) => {
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