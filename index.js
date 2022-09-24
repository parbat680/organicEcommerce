const express= require('express')
const mongoose= require('mongoose')
const app= express()
const ConnectionDB = require("./database");
require('dotenv').config()
const auth_routes= require('./routes/Authcontroller')
const category_routes= require('./routes/category')
const product_routes= require('./routes/product')
const order_routes= require('./routes/orders')
const multer= require('./routes/multer')
ConnectionDB();
app.use(express.json())

app.use('/api',multer.router);
app.use('/user',auth_routes);
app.use('/category',category_routes)
app.use('/product',product_routes)
app.use('/order',order_routes)


app.get('/',(req,res)=> {
    res.send('Welcome to Organic Ecommerce')
})

const port = process.env.PORT || 5000;

// app.get('/',(req,res)=> {
//     res.send({message: 'hello'})
// })

app.listen(port, () => `Server running on port ${port} 🔥`);