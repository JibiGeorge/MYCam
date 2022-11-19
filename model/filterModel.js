const db = require('../config/connection')
const collections = require('../config/collections')

module.exports = {
    getSalesRprtDetails: (fromDate,toDate)=>{
        fromDate=new Date(fromDate).toLocaleDateString("en-US")
        toDate=new Date(toDate).toLocaleDateString("en-US")

        return new Promise(async(resolve,reject)=>{
            let ordersList = await db.get().collection(collections.ORDER_COLLECTION).find (
                {$and:[
                    {date:
                        {$gte:fromDate}
                    },
                    {date:
                        {$lte:toDate}
                    }
                ]
            }).toArray()
            resolve(ordersList)
        })
    }
}