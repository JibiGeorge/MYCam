const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectID } = require('bson')

module.exports = {
    addImage: (file_url,file_Name, caption, deflag) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collections.SLIDER_IMAGE).insertOne(file_url,file_Name, caption, deflag).then((data) => {
                resolve.apply(data)
            })
        })
    },
    showImages: () => {
        return new Promise(async (resolve, reject) => {
            let SliderImage = await db.get().collection(collections.SLIDER_IMAGE).find().toArray()
            resolve(SliderImage)
        })
    },
    updateSlider: (id,caption,file_Name,file_url)=>{
        return new Promise(async(resolve,response)=>{
            db.get().collection(collections.SLIDER_IMAGE).updateOne({_id: ObjectID(id)},{
                $set:{
                    caption: caption,
                    file_Name: file_Name,
                    file_url:file_url
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteSlider: (id)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.SLIDER_IMAGE).deleteOne({_id: ObjectID(id)}).then((result)=>{
                resolve(result)
            })
        })
    }
}