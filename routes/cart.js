const express = require('express')
var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const product = require('../schemas/product');
const cart= require('../schemas/cart')

router.use(verify)

router.post('/add',async(req,res)=> {
    try {
        var prod= await product.findById(req.body.product)
        if(prod==undefined){
            return res.status(400).send({message :'product not found'})
        }

        const data= new cart({
            product: req.body.product,
            quantity: req.body.quantity,
            buyerEmail: req.user.userEmail,
        })

        const saved= await data.save();

        if(saved==undefined){
            return res.status(400).send({message: 'Cannot add product to cart'})
        }

        return res.send({messsage: saved})

    } catch (error) {
        return res.send({message: 'Error Occured'})
    }
})

router.get('/get',async(req,res)=> {

    try {
        
        var data=await cart.find({buyerEmail: req.user.userEmail}).populate({path: "product", select: "-quantity -_id"});

        return res.send({message:data})

    } catch (error) {
        return res.send({message: error})
    }
})

router.delete('/delete',async(req,res)=> {
    try {

         cart.deleteOne({_id: req.body.cart_id},(err,result)=>{
            if(err){
               throw err
            }
            else
            res.send(result)
        })

        
    } catch (error) {
        return res.send({message: error})
    }
})

module.exports= router;