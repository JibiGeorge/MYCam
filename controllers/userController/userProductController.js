const userCartModel = require('/Brototype/Week 8/MyCam/model/userCart')

const addtoCart= (req,res)=>{
    console.log(req.session.user._id);
    userCartModel.addToCart(req.params.id,req.session.user._id).then(()=>{
        res.redirect('/')
    })

}

module.exports={
    addtoCart
}