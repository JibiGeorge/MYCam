const brandController = require('../model/brand')

const brandPage = (req,res)=>{
    if(req.session.loggedIn){        
    brandController.getAllBrand().then((brand)=>{
        res.render('admin/brand',{admin:true,brand,title:"Brand"})
    })
    }else{
        res.render('admin/adminLogin', { admin: false })
    }
}
const addBrand = (req,res)=>{
    brandController.addBrandDetails(req.body).then((brand)=>{
        res.redirect('/admin/brand')
    })
}

const getBrandDetail = async (req, res) => {
    let brandId = req.query.id
    let brandData = await brandController.getBrandDetail(brandId)
    if (req.session.loggedIn) {
        categoryController.getAllBrand().then((brand) => {
            res.render('admin/brand', { admin: true, brand, brandData ,title:"Brand" })
        })
    } else {
        res.render('admin/adminLogin', { admin: false })
    }
}
const updateBrandDetail = (req, res) => {
    if (req.session.loggedIn) {
        brandController.updateBrand(req.params.id, req.body).then(() => {
            res.redirect('/admin/brand')
        })
    } else {
        res.render('admin/adminLogin', { admin: false })
    }
}
const deleteBrand = (req, res) => {
    if (req.session.loggedIn) {

        brandController.deleteBrand(req.query.id).then((response) => {
            res.redirect('/admin/brand')
        })
    } else {
        res.render('admin/adminLogin', { admin: false })
    }
}

module.exports={
    brandPage,
    addBrand,
    getBrandDetail,
    updateBrandDetail,
    deleteBrand
}