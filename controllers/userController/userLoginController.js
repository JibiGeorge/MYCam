const categoryController = require('/Brototype/Week 8/MyCam/model/category')
const userLoginModel = require('/Brototype/Week 8/MyCam/model/userLogin')
const imageSlider = require('/Brototype/Week 8/MyCam/model/sliderImageModel')
const productModel = require('/Brototype/Week 8/MyCam/model/product')
const nodemailer = require("nodemailer")
const userOTPModel = require('/Brototype/Week 8/MyCam/model/OTPModel')


const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;
const sendVerifyMail = async (name, email, id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'jibiyyan@gmail.com',
                pass: '*****************'
            }
        });

        const mailOption = {
            from: 'jibiyyan@gmail.com',
            to: email,
            subject: "For Verification Mail",
            // html: `<p> HI `+name+` , please click here to <a href="http://localhost:3000/verify?id='+userId+'"> Verify </a> your mail. </p> <h1>${OTP}</h1>` 
            html: `<p> Hi, ` + name + ` , Welcome to <h1>MyCam</h1>. Your OTP for Verification is <h3>${OTP}</h3> </p>`
        }
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(OTP);
                console.log("Email has been sent:- ", info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

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
    console.log(req.body);
    const verified = 0;
    const { first_Name, last_Name, user_Name, user_Email, mobile_No, password } = req.body
    userLoginModel.doSignUp(
        {
            verified,
            first_Name,
            last_Name,
            user_Name,
            user_Email,
            mobile_No,
            password
        }
    ).then((response) => {
        console.log(response);
        if (response.userexist) {
            categoryController.getCategory().then((category) => {
                res.render('user/userSignUpPage', { admin: false, user: true, category, errMsg: "Email Already Exist!", userData })
            })
        } else {
            let userId = response._id
            sendVerifyMail(response.user_Name, response.user_Email, userId)
            categoryController.getCategory().then((category) => {
                res.render('user/verificationOTP', { admin: false, user: true, category, userData, userId })
            })
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

const doSignUpVerification = (req, res) => {
    let userData = req.session.user
    const userOTP = req.body.OTP
    const userId = req.body.id
    console.log(req.body);
    try {
        if (userOTP == OTP) {
            console.log("correct");
            userOTPModel.updateVerification(userId).then((response) => {
                res.json({ status: true })
            })
        } else {
            console.log("wrong");
            categoryController.getCategory().then((category) => {
                res.render('user/verificationOTP', { admin: false, user: true, category, errMsg: "Invalid OTP", userId, userData })
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loginPage,
    signUpPage,
    doSignUp,
    doLogin,
    doLogout,
    doSignUpVerification
}