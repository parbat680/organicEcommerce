const express = require('express')
var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const product = require('../schemas/product');
const cart= require('../schemas/cart')
const order= require('../schemas/orders')

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
            address: req.body.address,
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
        
        var data=await cart.find({buyerEmail: req.user.userEmail}).populate({path: "product", select: "-quantity"});

        return res.send({message:data})

    } catch (error) {
        return res.send({message: error})
    }
})

router.delete('/delete',async(req,res)=> {
    try {

         cart.deleteOne({_id: req.body.cart_id},async(err,result)=>{
            if(err){
               throw err
            }
            else
            var data=await cart.find({buyerEmail: req.user.userEmail}).populate({path: "product", select: "-quantity"});

            return res.send({message:data})
        })

        
    } catch (error) {
        return res.send({message: error})
    }
})

router.post('/checkout', async (req,res)=> {
    try {
        var items=[];
        for (var i=0;i<req.body.product.length;i++){
            let item= new order({
                product: req.body.product[i],
                quantity: req.body.quantity[i],
                buyerEmail: req.user.userEmail,
                address: req.body.address,
            })
            cart.deleteOne({product: req.body.product[i]},(err,result)=>{
                if(err){
                   throw err
                }
            })
            items.push(item)
        }

         const saved=await  order.insertMany(items);

         return res.send({message: saved})


    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error Occured"})
    }
})

module.exports= router;
