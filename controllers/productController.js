const categoryController = require('../model/category')
const brandController = require('../model/brand')
const productController = require('../model/product')
const product = require('../model/product')
const { ObjectID } = require('bson')

const productManagementPage = (req, res) => {
    if (req.session.loggedIn) {
        productController.getProducts().then((product) => {
            res.render('admin/product/products', { admin: true, title: "Products", product, user: false });
        })
    } else {
        res.render('admin/adminLogin', { admin: false, user: false });
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
    // console.log(req.query);
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
    // console.log("Category ID is ",category_id);
    // console.log("Brand ID is: ", brand_id);
    const { product_Name, actual_Price, selling_Price, stock_In_Hand, description, specification } = req.body
    // req.files.forEach((singale_image)=>{
    productController.addProduct({
        picture: req.file.filename,
        category_id,
        brand_id,
        product_Name,
        product_Name,
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
    let productData = await productController.getProductDetail(req.query.id)
    if (req.session.loggedIn) {
        categoryController.getCategory().then((category) => {
            brandController.getAllBrand().then((brand) => {
                res.render('admin/product/updateProduct', { admin: true, title: "Update Product", productData, category, brand, user: false })
            })
        })
    }else {
        res.render('admin/adminLogin', { admin: false,user:false })
    }
}

const updateProductData = async (req,res)=>{
    let id = req.body.productID;
    let productPicture =req.file.filename
    let category_id = ObjectID(req.body.category_Name)
    let brand_id = ObjectID(req.body.brand)
    if(req.session.loggedIn){
        productController.updateProduct(id,req.body,productPicture,category_id,brand_id).then(()=>{
            res.redirect("/admin/productManagement");
        })
    }else {
        res.render('admin/adminLogin', { admin: false,user:false })
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