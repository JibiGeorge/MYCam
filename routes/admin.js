const express = require('express')
const multer = require('multer');
const { noPage, adminLoginPage, adminLogin, adminLogout } = require('../controllers/adminLoginContol.js')
const categoryController = require('../controllers/categoryController')
const branController = require('../controllers/brandController')
const productController = require('../controllers/productController')
const userManagementControl = require('../controllers/adminControl/adminUserManagement')
const sliderImageManagementControl = require('../controllers/adminControl/sliderImageManagementControl')

const router = express.Router();

//Storage Setting
const storage = multer.diskStorage({
    destination: './public/images', //directory (folder) setting
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname) // file name setting
    }
})

//Upload Setting
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif' ||
            file.mimetype == 'image/webp'

        ) {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
        }
    }
})

// router.get('*',noPage)
router.get('/', adminLoginPage)
router.post('/login', adminLogin)
router.get('/admin_Logout', adminLogout)

router.get('/Category', categoryController.categoryPage)
router.post('/category/addCategory', upload.single('categoryImage'), categoryController.addCategory)
router.get('/category/edit', categoryController.getCategoryDetail)
router.post('/category/update', upload.single('editCategoryImage'), categoryController.updateCategoryDetail)
router.get('/category/delete', categoryController.deleteCategory)

router.get('/brand', branController.brandPage)
router.post('/brand/addBrand', branController.addBrand)
router.get('/brand/edit', branController.getBrandDetail)
router.post('/brand/update', branController.updateBrandDetail)
router.get('/brand/delete', branController.deleteBrand)

router.get('/productManagement', productController.productManagementPage)
router.get('/addProduct', productController.addProductPage)
router.post('/addProduct/add', upload.single('productImage'), productController.addProduct)
router.get('/Product/delete', productController.deleteProduct)
router.get('/productUpdate', productController.updatePage)
router.post('/productUpdate/updateData', upload.single('productImage'), productController.updateProductData)

router.get('/userManagement', userManagementControl.userManagementPage);

router.get('/silderImage',sliderImageManagementControl.sliderPage);
router.post('/add',upload.single('sliderImage'),sliderImageManagementControl.sliderImageAdd)
router.post('/update',upload.single('sliderImage'),sliderImageManagementControl.updateSlider)

module.exports = router