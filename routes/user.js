const express = require('express')
const router = express.Router()
const userHomePageController = require('../controllers/userController/userHomePageController')

router.get('/',userHomePageController.homePage)


module.exports = router