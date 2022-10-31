const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userLoginModel = require('/Brototype/Week 8/MyCam/model/userLogin')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')
const productModel = require('/Brototype/Week 8/MyCam/model/product')

const loginPage = (req, res) => {
    let userData = req.session.user
    if (req.session.userLoggedIn) {
        res.redirect('/')
    } else {
        categoryController.getCategory().then((category) => {
            res.render('user/userLoginPage', { admin: false, user: true, category, userData })
        })
    }
}
const signUpPage = (req, res) => {
    let userData = req.session.user
    if (req.session.userLoggedIn) {
        res.redirect('/')
    } else {
        categoryController.getCategory().then((category) => {
            res.render('user/userSignUpPage', { admin: false, user: true, category, userData })
        })
    }
}
const doSignUp = (req, res) => {
    let userData = req.session.user
    userLoginModel.doSignUp(req.body).then((response) => {
        if (response) {
            categoryController.getCategory().then((category) => {
                res.render('user/userSignUpPage', { admin: false, user: true, category, errMsg: "UserName Already Exist!", userData })
            })
        } else {
            res.redirect('/')
        }
    })
}
const doLogin = (req, res) => {
    let userData = req.session.user
    userLoginModel.doLogin(req.body).then((response) => {
        if (response.userFalse) {
            categoryController.getCategory().then((category) => {
                return res.render('user/userLoginPage', { admin: false, user: true, category, errMsg: "User Not Found", userData })
            })
        }
        console.log(response.status);
        if (response.status) {
            req.session.userLoggedIn = true
            req.session.user = response.user
            res.redirect('/')
        } else {
            categoryController.getCategory().then((category) => {
                return res.render('user/userLoginPage', { admin: false, user: true, category, errMsg: "Invalid Username or Password", userData })
            })
        }
    })
}
const doLogout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log("Error");
            res.send("Error")
        } else {
            res.redirect('/login')
        }
    })
}

module.exports = {
    loginPage,
    signUpPage,
    doSignUp,
    doLogin,
    doLogout
}