const express = require('express')
const multer = require('multer');
const sessionHandle = require('../middleware/adminSession')
const { noPage, adminLoginPage, adminLogin, adminLogout } = require('../controllers/adminLoginContol')
const categoryController = require('../controllers/categoryController')
const branController = require('../controllers/brandController')
const productController = require('../controllers/productController')
const userManagementControl = require('../controllers/adminUserManagement')
const sliderImageManagementControl = require('../controllers/sliderImageManagementControl')
const orderController = require('../controllers/orderController');
const couponController = require('../controllers/couponController')
const reportController = require('../controllers/reportController')
const { Db } = require('mongodb');
const {storage } = require('../cloudinary/index')
const upload = multer({ storage });

const router = express.Router();

router.get('/',sessionHandle.adminSession, adminLoginPage)
router.post('/login', adminLogin)
router.get('/admin_Logout', adminLogout)

router.get('/Category',sessionHandle.adminSession, categoryController.categoryPage)
router.post('/category/addCategory',sessionHandle.adminSession, upload.single('categoryImage'), categoryController.addCategory)
router.get('/category/edit',sessionHandle.adminSession, categoryController.getCategoryDetail)
router.post('/category/update',sessionHandle.adminSession, upload.single('editCategoryImage'), categoryController.updateCategoryDetail)
router.get('/category/delete',sessionHandle.adminSession, categoryController.deleteCategory)

router.get('/brand',sessionHandle.adminSession, branController.brandPage)
router.post('/brand/addBrand',sessionHandle.adminSession, branController.addBrand)
router.get('/brand/edit',sessionHandle.adminSession, branController.getBrandDetail)
router.post('/brand/update',sessionHandle.adminSession, branController.updateBrandDetail)
router.get('/brand/delete',sessionHandle.adminSession, branController.deleteBrand)

router.get('/productManagement',sessionHandle.adminSession, productController.productManagementPage)
router.get('/addProduct',sessionHandle.adminSession, productController.addProductPage)
router.post('/addProduct/add',sessionHandle.adminSession, upload.single('productImage'), productController.addProduct)
router.get('/Product/delete',sessionHandle.adminSession, productController.deleteProduct)
router.get('/productUpdate',sessionHandle.adminSession, productController.updatePage)
router.post('/productUpdate/updateData',sessionHandle.adminSession, upload.single('productImage'), productController.updateProductData)

router.get('/userManagement',sessionHandle.adminSession, userManagementControl.userManagementPage);
router.post('/userManagement/block',sessionHandle.adminSession, userManagementControl.userBlock)
router.post('/userManagement/unBlock',sessionHandle.adminSession, userManagementControl.userUnBlock)

router.get('/silderImage',sessionHandle.adminSession, sliderImageManagementControl.sliderPage);
router.post('/slideradd',sessionHandle.adminSession, upload.single('sliderImage'),sliderImageManagementControl.sliderImageAdd)
router.post('/sliderUpdate',sessionHandle.adminSession, upload.single('sliderImage'),sliderImageManagementControl.updateSlider)
router.delete('/sliderDelete',sessionHandle.adminSession, sliderImageManagementControl.deleteSlider)

router.get('/orders',sessionHandle.adminSession, orderController.orderPage)
router.get('/viewDetails',sessionHandle.adminSession, orderController.orderDetails)
router.post('/order/statusUpdate',sessionHandle.adminSession, orderController.updateOrderDetails)
router.get('/salesReport/filer',sessionHandle.adminSession,reportController.getSalesReports)

router.get('/coupon',sessionHandle.adminSession, couponController.getCouponPage)
router.get('/couponCreate',sessionHandle.adminSession, couponController.createPage)
router.post('/coupon/add',sessionHandle.adminSession, couponController.addCoupon)
router.delete('/coupon/delete',sessionHandle.adminSession, couponController.deleteCoupon)
router.put('/coupon/update',sessionHandle.adminSession,couponController.updateStatus)
router.get('/couponDetails',sessionHandle.adminSession,couponController.getCouponDetails)

// Chart
router.get('/orderCount',sessionHandle.adminSession,orderController.orderStatusCount)







module.exports = router