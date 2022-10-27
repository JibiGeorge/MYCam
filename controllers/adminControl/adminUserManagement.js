const userModel = require('/Brototype/Week 8/MyCam/model/userLogin')
const userManagementPage = (req,res)=>{
    userModel.showUsers().then((usersList)=>{
        console.log(usersList);
        
    res.render('admin/userControl/userManagement',{admin:true,user:false,title:"User Management",usersList})
    })
}

module.exports = {
    userManagementPage
}