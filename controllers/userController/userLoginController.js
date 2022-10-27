const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userLoginModel = require('/Brototype/Week 8/MyCam/model/userLogin')

const loginPage = (req, res) => {
    categoryController.getCategory().then((category) => {
        res.render('user/userLoginPage', { admin: false, user: true, category })
    })
}
const signUpPage = (req, res) => {
    categoryController.getCategory().then((category) => {
        res.render('user/userSignUpPage', { admin: false, user: true, category })
    })
}
const doSignUp = (req,res)=>{
    userLoginModel.doSignUp(req.body).then((response)=>{
        if(response){
            categoryController.getCategory().then((category) => {
            res.render('user/userSignUpPage', { admin: false, user: true, category, errMsg:"UserName Already Exist!" })
            })
        }else{
            res.redirect('/')
        }
    })
}
const doLogin = (req,res)=>{
    userLoginModel.doLogin(req.body).then((response)=>{
        if(response.userFalse){
            categoryController.getCategory().then((category) => {
                return res.render('user/userLoginPage', { admin: false, user: true, category,errMsg:"User Not Found"})
            })
        }

        if(response.staus){
            req.session.loggedIn = true
            req.session.user = response.user
            res.redirect('/')
        }else{
            categoryController.getCategory().then((category) => {
                return res.render('user/userLoginPage', { admin: false, user: true, category,errMsg:"Invalid Username or Password"})
            })
        }
    })
}

module.exports = {
    loginPage,
    signUpPage,
    doSignUp,
    doLogin
}