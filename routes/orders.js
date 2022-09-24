const express = require('express')

var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const { response } = require('express');
const { validate } = require('../schemas/user');
const product = require('../schemas/product');
const order= require('../schemas/orders');
const { reset } = require('nodemon');



router.use(verify)

router.get('/get',async (req,res)=> {
    if(req.user.userEmail != req.body.email){
        res.status(400).send({message: 'User Email is not valid'})
        return;
    }
    try {
        
        var data = await order.find({buyerEmail: req.body.email}).populate({path: ('product'),select:'-quantity',populate:{
            path: 'category',
        }})
    
    res.status(200).send(data)
    } catch (error) {
        
        res.status(500).send({message: error.message})
    }
})

router.post('/add',async(req,res)=> {
    try {
        var prod=await product.findById(req.body.product)
        if(!prod){
            res.status(400).send({message: 'cannot find product'})
            return;
        }
        var data=new order({
            product: prod._id,
            quantity: req.body.quantity,
            buyerEmail: req.body.email,
        })

        var saved= await data.save();

        res.status(200).send(saved);

    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports= router