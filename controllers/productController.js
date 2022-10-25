const categoryController = require('../model/category')
const brandController = require('../model/brand')
const productController = require('../model/product')
const product = require('../model/product')

const productManagementPage = (req, res) => {
    if (req.session.loggedIn) {
        productController.getProduct().then((product) => {
            res.render('admin/product/products', { admin: true, title: "Products", product, user: false })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const addProductPage = (req, res) => {
    categoryController.getCategory().then((category) => {
        brandController.getAllBrand().then((brand) => {
            res.render('admin/product/addProduct', { admin: true, title: "Products", category, brand, user: false })
        })
    })
}
const addProduct = (req, res) => {
    const { product_Name, category_Name, brand, actual_Price, selling_Price, stock_In_Hand, description, specification } = req.body
    // req.files.forEach((singale_image)=>{
    productController.addProduct({
        Picture: req.files,
        product_Name,
        product_Name,
        category_Name,
        brand,
        actual_Price,
        selling_Price,
        stock_In_Hand,
        description,
        specification
        // data: req.body
    }).then((product) => {
        res.redirect('/admin/addProduct')
    })
    // productController.addProduct(req.body).then((product)=>{
    //     res.redirect('/admin/addProduct')
    // })
    // })

}
const deleteProduct = (req, res) => {
    if (req.session.loggedIn) {

        productController.deleteProduct(req.query.id).then((response) => {
            res.redirect('/admin/productManagement')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const updatePage = async (req, res) => {
    let productData = await productController.getProduct(req.query.id)
    console.log(productData);
    if (req.session.loggedIn) {
        console.log(productData[0].product_Name);
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/updateProduct', { admin: true, title: "Update Product", productData, category, brand, user: false })
            })
        })
    }
}


module.exports = {
    productManagementPage,
    addProductPage,
    addProduct,
    deleteProduct,
    updatePage
}