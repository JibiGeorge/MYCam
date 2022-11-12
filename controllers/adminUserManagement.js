const userModel = require('../model/userLogin')


const userManagementPage = (req, res) => {
        userModel.showUsers().then((usersList) => {
            res.render('admin/userControl/userManagement', { admin: true, user: false, title: "User Management", usersList })
        })
}

const userBlock = (req,res)=>{
        userModel.blockUser(req.body.userID).then((response)=>{
            res.json({status:true})
        })
}

const userUnBlock= (req,res)=>{
        userModel.unBlockUser(req.body.userID).then((response)=>{
            res.json({status:true})
        })
}

module.exports = {
    userManagementPage,
    userBlock,
    userUnBlock
}