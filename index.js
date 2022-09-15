const express= require('express')
const mongoose= require('mongoose')
const app= express()
require('dotenv').config()
const auth_routes= require('./routes/Authcontroller')
const category_routes= require('./routes/category')
const product_routes= require('./routes/product')
const order_routes= require('./routes/orders')


app.use(express.json())

const mongo_url= process.env.DATABASE_URL;

mongoose.connect(mongo_url)
const database= mongoose.connection

database.on('error',(error)=> {
    console.log('Error connecting database')
})

database.once('connected',(connected)=> {
    console.log('Database connected...')
})

app.use('/user',auth_routes);
app.use('/category',category_routes)
app.use('/product',product_routes)
app.use('/order',order_routes)

app.get('/',(req,res)=> {
    console.log('Welcome to Organic Ecommerce')
})

const port = process.env.PORT || 5000;

// app.get('/',(req,res)=> {
//     res.send({message: 'hello'})
// })

app.listen(port, () => `Server running on port ${port} 🔥`);