const userModel = require('/Brototype/Week 8/MyCam/model/userLogin')


const userManagementPage = (req, res) => {
    if (req.session.adminloggedIn) {
        userModel.showUsers().then((usersList) => {
            res.render('admin/userControl/userManagement', { admin: true, user: false, title: "User Management", usersList })
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

module.exports = {
    userManagementPage
}