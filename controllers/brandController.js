const brandController = require('../model/brand')

const brandPage = (req, res) => {
        brandController.getAllBrand().then((brand) => {
            res.render('admin/brand', { admin: true, brand, title: "Brand", user: false })
        })
}
const addBrand = (req, res) => {
        brandController.addBrandDetails(req.body).then((brand) => {
            res.redirect('/admin/brand')
        })
}

const getBrandDetail = async (req, res) => {
    let brandId = req.query.id
    let brandData = await brandController.getBrandDetail(brandId)
        categoryController.getAllBrand().then((brand) => {
            res.render('admin/brand', { admin: true, brand, brandData, title: "Brand", user: false })
        })
}
const updateBrandDetail = (req, res) => {
    let id = req.body.brandID;
    let brandName = req.body.editBrandName
        brandController.updateBrand(id, brandName).then(() => {
            res.redirect('/admin/brand')
        })
}
const deleteBrand = (req, res) => {
        brandController.deleteBrand(req.query.id).then((response) => {
            res.redirect('/admin/brand')
        })
}

module.exports = {
    brandPage,
    addBrand,
    getBrandDetail,
    updateBrandDetail,
    deleteBrand
}