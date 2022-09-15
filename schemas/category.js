const mongoose= require('mongoose')

const category=mongoose.Schema({
    category_name: {
        required: true,
        unique: true,
        type: String,
    },
    category_description: {
        required: true,
        type: String,

    },
    category_avatar:{
        
        type: String,
        default: null,
    },
})

module.exports=mongoose.model('category',category)