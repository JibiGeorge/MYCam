const filerModel = require('../model/filterModel')

const getSalesReports = (req,res)=>{
    let from_Date = req.query.from_Date
    let to_Date = req.query.to_date
    filerModel.getSalesRprtDetails(from_Date,to_Date).then((ordersList)=>{
        res.send(ordersList)
    })
}
module.exports = {
    getSalesReports
}