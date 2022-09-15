const mongoose = require('mongoose')

const user= mongoose.Schema({
    userName: {
        type: String,
        required : true,
    },
    userEmail : {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required : true,
    },
    avatar: {
        type: String,
        required : true,
        default: "",
    },
    created_on: {
        type : String,
        required : true,
       
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],

})

module.exports= user;