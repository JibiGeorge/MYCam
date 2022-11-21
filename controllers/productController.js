const categoryController = require('../model/category')
const brandController = require('../model/brand')
const productController = require('../model/product')
const product = require('../model/product')
const { ObjectID } = require('bson')

const productManagementPage = (req, res) => {
        productController.getProducts().then((product) => {
            res.render('admin/product/products', { admin: true, title: "Products", product, user: false });
        })
}
const addProductPage = (req, res) => {
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/addProduct', { admin: true, title: "Products", category, brand, user: false })
            })
        })
}
const addProduct = (req, res) => {
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
    let actual_Price = parseInt(req.body.actual_Price)
    let selling_Price = parseInt(req.body.selling_Price)
        const { product_Name, stock_In_Hand, feature_or_recent, description, specification } = req.body
        productController.addProduct({
            fie_Name: req.file.filename,
            file_url: req.file.path,
            category_id,
            brand_id,
            product_Name,
            product_Name,
            actual_Price,
            selling_Price,
            stock_In_Hand,
            feature_or_recent,
            description,
            specification,
            sold:0
        }).then((product) => {
            res.redirect('/admin/addProduct')
        })
}
const deleteProduct = (req, res) => {
        productController.deleteProduct(req.query.id).then((response) => {
            res.redirect('/admin/productManagement')
        })
}
const updatePage = async (req, res) => {
    let productData = await productController.getProductDetail(req.query.id)
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/updateProduct', { admin: true, title: "Update Product", productData, category, brand, user: false })
            })
        })
}

const updateProductData = async (req, res) => {
    let id = req.body.productID;
    let fie_Name = req.file.filename
    let file_url = req.file.path
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
        productController.updateProduct(id, req.body, fie_Name, file_url, category_id, brand_id).then(() => {
            res.redirect("/admin/productManagement");
        })
}


module.exports = {
    productManagementPage,
    addProductPage,
    addProduct,
    deleteProduct,
    updatePage,
    updateProductData
}