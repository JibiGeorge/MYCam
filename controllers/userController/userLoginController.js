const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userLoginModel = require('/Brototype/Week 8/MyCam/model/userLogin')

const login = (req, res) => {
    categoryController.getCategory().then((category) => {
        res.render('user/userLoginPage', { admin: false, user: true, category })
    })
}
const signUp = (req, res) => {
    categoryController.getCategory().then((category) => {
        res.render('user/userSignUpPage', { admin: false, user: true, category })
    })
}
const doSignUp = (req,res)=>{
    userLoginModel.doSignUp(req.body).then((result)=>{
        if(result.userexist){
            categoryController.getCategory().then((category) => {
            res.render('user/userSignUpPage', { admin: false, user: true, category, errMsg:"UserName Already Exist!" })
            })
        }else{
            res.redirect('/')
        }
    })
}
module.exports = {
    login,
    signUp,
    doSignUp
}