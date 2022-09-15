const express = require('express')

var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const { response } = require('express');
const { validate } = require('../models/usermodel');
const product = require('../models/product');
const order= require('../models/orders');
const { reset } = require('nodemon');



router.use(verify)

router.get('/get',async (req,res)=> {
    try {
        var data = await order.find({buyerPhone: req.body.phone}).populate({path: 'product',populate:{
            path: 'category',
        }})

    res.status(200).send(data)
    } catch (error) {
        res.status(500).send({message: 'Error Occured'})
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
            buyerPhone: req.body.phone,
        })

        var saved= await data.save();

        res.status(200).send(saved);

    } catch (error) {
        res.status(500).send({message: 'Error Occured'})
    }
})

module.exports= router