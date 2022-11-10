const categoryController = require('../../model/category')
const brandController = require('../../model/brand')
const productController = require('../../model/product')
const product = require('../../model/product')
const { ObjectID } = require('bson')

const productManagementPage = (req, res) => {
    if (req.session.adminloggedIn) {
        productController.getProducts().then((product) => {
            res.render('admin/product/products', { admin: true, title: "Products", product, user: false });
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false });
    }
}
const addProductPage = (req, res) => {
    if (req.session.adminloggedIn) {
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/addProduct', { admin: true, title: "Products", category, brand, user: false })
            })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false });
    }
}
const addProduct = (req, res) => {
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
    let actual_Price = parseInt(req.body.actual_Price)
    let selling_Price = parseInt(req.body.selling_Price)
    if (req.session.adminloggedIn) {
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
            specification
        }).then((product) => {
            res.redirect('/admin/addProduct')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false });
    }
}
const deleteProduct = (req, res) => {
    if (req.session.adminloggedIn) {
        productController.deleteProduct(req.query.id).then((response) => {
            res.redirect('/admin/productManagement')
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}
const updatePage = async (req, res) => {
    let productData = await productController.getProductDetail(req.query.id)
    if (req.session.adminloggedIn) {
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/updateProduct', { admin: true, title: "Update Product", productData, category, brand, user: false })
            })
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }
}

const updateProductData = async (req, res) => {
    let id = req.body.productID;
    let fie_Name = req.file.filename
    let file_url = req.file.path
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
    if (req.session.adminloggedIn) {
        productController.updateProduct(id, req.body, fie_Name, file_url, category_id, brand_id).then(() => {
            res.redirect("/admin/productManagement");
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false })
    }

}


module.exports = {
    productManagementPage,
    addProductPage,
    addProduct,
    deleteProduct,
    updatePage,
    updateProductData
}