const brandController = require('../../model/brand')

const brandPage = (req, res) => {
    if (req.session.adminloggedIn) {
        brandController.getAllBrand().then((brand) => {
            res.render('admin/brand', { admin: true, brand, title: "Brand", user: false })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const addBrand = (req, res) => {
    if (req.session.adminloggedIn) {
        brandController.addBrandDetails(req.body).then((brand) => {
            res.redirect('/admin/brand')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

const getBrandDetail = async (req, res) => {
    let brandId = req.query.id
    let brandData = await brandController.getBrandDetail(brandId)
    if (req.session.adminloggedIn) {
        categoryController.getAllBrand().then((brand) => {
            res.render('admin/brand', { admin: true, brand, brandData, title: "Brand", user: false })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const updateBrandDetail = (req, res) => {
    let id = req.body.brandID;
    let brandName = req.body.editBrandName
    if (req.session.adminloggedIn) {
        brandController.updateBrand(id, brandName).then(() => {
            res.redirect('/admin/brand')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const deleteBrand = (req, res) => {
    if (req.session.adminloggedIn) {
        brandController.deleteBrand(req.query.id).then((response) => {
            res.redirect('/admin/brand')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

module.exports = {
    brandPage,
    addBrand,
    getBrandDetail,
    updateBrandDetail,
    deleteBrand
}