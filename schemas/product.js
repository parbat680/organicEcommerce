const mongoose= require('mongoose')

const product= mongoose.Schema({
    product_name:{
        required: true,
        type: String,
        unique:true,
    },
    product_description:{
        required: true,
        type: String
    },
    category:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'category',
    },
    price: {
        required: true,
        type: Number,
        
    },
    quantity:{
        required: true,
        type: Number
    },
    reviews:[
        {

        username: {
            required: true,
            type: String,
            
        },
        rating : {
            required : true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
        
    }],
    product_images: [{
        type: String,

    }]


});

module.exports= mongoose.model('product',product);