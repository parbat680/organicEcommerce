const express = require('express')
const product = require('../schemas/product')
const category= require('../schemas/category')
var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const { response } = require('express');
const { upload } = require('./multer');



router.use(verify)

router.get('/get',async (req,res)=>{
   try{
        var data= await product.find().populate('category')
        if(data)
            res.status(200).send(data)
        else res.status(400).send({message:"Error Occured",error:error})
   }
    catch (error) {
        res.status(500).send({message: "Error Occured",error:error})
    }
})

router.get('/get/:_id',async (req,res)=>{
    try{
         var data= await product.findOne({_id:req.params._id}).populate('category')
         if(data)
             res.status(200).send(data)
         else res.status(400).send({message:error.message})
    }
     catch (error) {
         res.status(500).send({message:error.message})
     }
 })

router.post('/add',upload.array('images'),async (req,res)=> {
    try {
        var cat= await category.findOne({category_name:req.body.category})
        if(!cat){
            res.status(400).send({message: "Error Occured"})
            res.end();
        }
        let images=[]
        
        var data= new product({
            name: req.body.name,
            description: req.body.description,
            category: cat._id,
            price: req.body.price,
            quantity: req.body.quantity,
            
        })
        for(i=0;i<req.files.length;i++){
            data.images.push('https://organice-commerce.herokuapp.com/api/'+req.files[i].filename);
        }

        var result= await data.save();
        if(result)
            res.send(result)
        
        else res.status(400).send({message: "Error Occured"})

    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = router