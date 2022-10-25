const express = require('express')
const multer = require('multer');
const {noPage, adminLoginPage, adminLogin,adminLogout} = require('../controllers/adminLoginContol.js')
const categoryController=require('../controllers/categoryController')
const branController = require('../controllers/brandController')
const productController = require('../controllers/productController')

const router = express.Router();


//Storage Setting
let storage = multer.diskStorage({
    destination:'./public/images', //directory (folder) setting
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) // file name setting
    }
})

//Upload Setting
let upload = multer({
    storage: storage,
    fileFilter:(req, file, cb)=>{
     if(
         file.mimetype == 'image/jpeg' ||
         file.mimetype == 'image/jpg' ||
         file.mimetype == 'image/png' ||
         file.mimetype == 'image/gif' ||
         file.mimetype == 'image/webp'
 
     ){
         cb(null, true)
     }
     else{
         cb(null, false);
         cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
     }
    }
 })




// router.get('*',noPage)
router.get('/',adminLoginPage)
router.post('/login',adminLogin)
router.get('/admin_Logout',adminLogout)

router.get('/Category',categoryController.categoryPage)
router.post('/category/addCategory',categoryController.addCategory)
router.get('/category/edit',categoryController.getCategoryDetail)
router.post('/category/update/:id',categoryController.updateCategoryDetail)
router.get('/category/delete',categoryController.deleteCategory)

router.get('/brand',branController.brandPage)
router.post('/brand/addBrand',branController.addBrand)
router.get('/brand/edit',branController.getBrandDetail)
router.post('/brand/update/:id',branController.updateBrandDetail)
router.get('/brand/delete',branController.deleteBrand)

router.get('/productManagement',productController.productManagementPage)
router.get('/addProduct',productController.addProductPage)
router.post('/addProduct/add',upload.array('productImage',5),productController.addProduct)
router.get('/Product/delete',productController.deleteProduct)
router.get('/productUpdate',productController.updatePage)

module.exports = router