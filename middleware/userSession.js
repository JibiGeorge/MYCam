const categoryController = require('../model/category')

const userLoginSession = (req,res,next)=>{    
    let userData = req.session.user
    if(req.session.userLoggedIn){
        next()
    }else{
        categoryController.getCategory().then((category) => {
            res.render('user/userLoginPage', { admin: false, user: true, category, userData })
        })
    }
}

const userSignupSession = (req,res,next)=>{    
    let userData = req.session.user
    if(req.session.userLoggedIn){
        next()
    }else{
        categoryController.getCategory().then((category) => {
            res.render('user/userSignUpPage', { admin: false, user: true, category, userData })
        })
    }
}

module.exports = {userLoginSession,userSignupSession}