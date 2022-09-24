const jwt = require ('jsonwebtoken')
const user= require('../schemas/user')
require('dotenv').config()

exports.verify=  async function(req,res,next) {
    let token= req.header('token');

    if(!token){
        return res.status(400).send({message: 'send token in the headers'})
    }

    let payload;

    try {
        
        payload= jwt.verify(token,process.env.JWT_SECRET);
        
        req.id= payload.id;
        req.user= await user.findOne({_id:req.id});
        
        next();

    } catch (error) {
        res.status(401).send({message: 'Token Not valid'})
    }
}

