const mongoose= require('mongoose')
const product = require('../models/product')

const model= mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyerEmail : {
        required : true,
        type: String
    },


})

module.exports= mongoose.model('order',model);
