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

const userBlock = (req,res)=>{
    if(req.session.admin){
        userModel.blockUser(req.body.userID).then((response)=>{
            res.json({status:true})
        })
    }
}

const userUnBlock= (req,res)=>{
    if(req.session.admin){
        userModel.unBlockUser(req.body.userID).then((response)=>{
            res.json({status:true})
        })
    }
}

module.exports = {
    userManagementPage,
    userBlock,
    userUnBlock
}