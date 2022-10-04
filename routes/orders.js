const express = require('express')

var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const product = require('../schemas/product');
const order= require('../schemas/orders');




router.use(verify)

router.get('/get',async (req,res)=> {
    if(req.user.userEmail != req.body.email){
       return res.status(400).send({message: 'User Email is not valid'})
       
    }
    try {
        
        var data = await order.find({buyerEmail: req.body.email}).populate({path: ('product'),select:'-quantity',populate:{
            path: 'category',
        }})
    
    return res.send(data)
    } catch (error) {
        
        return res.status(500).send({message: error.message})
    }
})

router.post('/add',async(req,res)=> {
    try {
        var prod=await product.findById(req.body.product)
        if(!prod){
            return res.status(400).send({message: 'cannot find product'})  
        }
       console.log(req.user)
        var data=new order({
            product: prod._id,
            quantity: req.body.quantity,
            buyerEmail: req.user.userEmail,
        })

        var saved= await data.save();
         product.findByIdAndUpdate(saved.product,{$inc:{quantity:-saved.quantity}},function (err,result){
            if(err){
                order.remove(_id= saved._id);
                
            }
            

        })
        return res.status(200).send(saved);

    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

module.exports= router